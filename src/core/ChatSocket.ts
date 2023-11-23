import constants from "../constants";
import {getChatToken} from "../services/chat";
import {isMessageDTO, MessageDTO} from "../api/type";
import {transformMessage} from "../utils/apiTransformers";
import {Message} from "../types/types";
import {processHTTPError} from "./processHTTPError";

type ChatSocketConstructorArgs = {
    chatId: number,
    userId: number,
    onOpen?: (event: Event) => void,
    onAddMessages: (messages: Message[]) => void,
    onError?: (event: Event) => void,
    onClose?: (event: CloseEvent) => void,
    onUserConnected?: (userId: string) => void,
}

export default class ChatSocket {
    private socket: null | WebSocket = null;
    private pingInterval: number = 0;
    private reconnectTimeout: number = 0;
    private params: ChatSocketConstructorArgs;
    private socketUrl = "";
    private shouldBeClosed: boolean = false;
    private onConnect: () => boolean = () => true;

    constructor({chatId, userId, onOpen, onAddMessages, onError, onClose, onUserConnected}: ChatSocketConstructorArgs) {
        this.params = {chatId, userId, onOpen, onAddMessages, onError, onClose, onUserConnected};
        this.connect();
    }

    public connect() {
        this.shouldBeClosed = false;
        getChatToken(this.params.chatId).then((chatToken) => {
            this.socketUrl = `${constants.SOCKET}/chats/${this.params.userId}/${this.params.chatId}/${chatToken.token}/`;
            this.socket = new WebSocket(this.socketUrl);

            this.socket.addEventListener("open", () => this.afterConnect());

            if (this.params.onOpen)
                this.socket.addEventListener("open", this.params.onOpen);

            this.socket.addEventListener("message", (event: MessageEvent) => this.messageReceived(event));

            this.socket.addEventListener("error", (event: Event) => this.error(event));

            this.socket.addEventListener("close", () => this.afterClose());

            if (this.params.onClose)
                this.socket.addEventListener("close", this.params.onClose);
        }).catch((error) => {
            processHTTPError(error);
        });
    }

    public error(event: Event) {
        console.warn("socket response error", event);
        if (this.params.onError) {
            this.params.onError(event);
        }
    }

    public unknown(event: MessageEvent) {
        console.warn("socket unknown response", event);
    }

    public addMessages(messages: MessageDTO[]) {
        if (this.params.onAddMessages) {
            this.params.onAddMessages(messages.map(message => transformMessage(message)));
        }
    }

    public userConnected(userId: string) {
        if (this.params.onUserConnected) {
            this.params.onUserConnected(userId);
        }
    }

    public pong() {

    }

    public messageReceived (event: MessageEvent) {
        let response: {type: "user connected", content: string} | {type: "pong"} | MessageDTO | MessageDTO[] | null;
        try {
            response = JSON.parse(event.data);
        }
        catch {
            response = null;
        }

        if (!response) {
            this.error(event);
        }
        else {
            if (Array.isArray(response)) {
                this.addMessages(response);
            }
            else if (isMessageDTO(response)) {
                response.is_read = false;
                response.chat_id = this.params.chatId;
                this.addMessages([response as MessageDTO]);
            }
            else if (response.type === "user connected") {
                this.userConnected(response.content);
            }
            else if (response.type === "pong") {
                this.pong();
            }
            else {
                this.unknown(event);
            }
        }
    }

    public afterConnect () {
        if (this.onConnect && !this.onConnect())
            return;
        if (this.pingInterval) {
            window.clearInterval(this.pingInterval);
            this.pingInterval = 0;
        }
        this.pingInterval = window.setInterval(() => this.ping(), 10000);
        if (!this.socket)
            return;
    }

    public afterClose () {
        if (this.pingInterval) {
            window.clearInterval(this.pingInterval);
            this.pingInterval = 0;
        }
        if (!this.shouldBeClosed) {
            this.connect();
        }
    }

    public send (data: string) {
        if (!this.socket)
            return;
        this.socket.send(data);
    }

    public sendMessage(text: string) {
        this.sendData({
            content: text,
            type: "message"
        });
    }

    public sendFile (fileId: number) {
        this.sendData({
            content: fileId,
            type: "file"
        });
    }

    public sendSticker (stickerId: number) {
        this.sendData({
            content: stickerId,
            type: "sticker"
        });
    }

    public getOld (offset: number) {
        this.sendData({
            content: offset,
            type: "get old"
        });
    }

    public sendData (data: Record<string, string | number>) {
        if (!this.socket)
            return;
        this.socket.send(JSON.stringify(data));
    }

    public ping () {
        if (!this.socket)
            return;
        this.socket.send(JSON.stringify({type: "ping"}));
    }

    public close () {
        this.shouldBeClosed = true;
        if (!this.socket)
            return;
        this.disconnect();
    }

    private disconnect() {
        if (!this.socket)
            return false;
        if (this.socket.readyState == 1)
            this.socket.close();
        else
            this.onConnect = () => this.disconnect();
        return false;
    }

    destroy() {
        if (this.pingInterval) {
            window.clearInterval(this.pingInterval);
            this.pingInterval = 0;
        }
        if (this.reconnectTimeout) {
            window.clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = 0;
        }
        if (this.socket instanceof WebSocket) {
            this.socket.close();
        }
    }
}
