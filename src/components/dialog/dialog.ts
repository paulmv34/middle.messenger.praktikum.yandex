import Block from "../../core/Block";
import {
    Props,
    Chat,
    NodeEvent,
    User,
    isPlainObject,
    Message,
    RefType,
    BlockData,
    MessageFormData
} from "../../types/types";
import template from "./dialog.hbs?raw";
import {connect} from "../../utils/connect";
import {getChatNewMessagesCount, getChatUsers} from "../../services/chat";
import ChatSocket from "../../core/ChatSocket";
import DialogList from "../dialog-list/dialog-list";
import ModalSendFileForm from "../modal-send-file-form/modal-send-file-form";
import ModalChatAvatarForm from "../modal-chat-avatar-form/modal-chat-avatar-form";
import ModalAddUserForm from "../modal-add-user-form/modal-add-user-form";
import ModalRemoveUserForm from "../modal-remove-user-form/modal-remove-user-form";
import ModalDeleteChatForm from "../modal-delete-chat-form/modal-delete-chat-form";
import {cloneDeep} from "../../utils/cloneDeep";
import formatDate from "../../utils/formatDate";
import {processHTTPError} from "../../core/processHTTPError";

interface IProps extends Props {
    chat?: Chat,
    messages: Message[],
    user: User,
    onModalShow?: (e: NodeEvent<HTMLElement>) => void,
    onSendMessage?: (messageFormData: MessageFormData) => void,
}

interface IRefs extends RefType {
    dialogList: DialogList,
    sendFileForm: ModalSendFileForm,
    chatAvatarForm: ModalChatAvatarForm,
    addUserForm: ModalAddUserForm,
    removeUserForm: ModalRemoveUserForm,
    deleteChatForm: ModalDeleteChatForm,
}

interface IBlockData extends BlockData {
    socket: ChatSocket | null,
    initStage: "init" | "unread" | "ready" | "",
    unread: number,
    users: Record<number, User>,
    messages: Message[],
    addedBottom: number,
    addedTop: number,
    endReached: boolean,
}

export class Dialog extends Block<IProps, IRefs, IBlockData> {
    constructor(props: IProps | undefined = {} as IProps) {
        super(props as IProps);
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onModalShow = this.modalShow.bind(this);
        props.onModalShow = (e: NodeEvent<HTMLElement>) => onModalShow(e);
        const onSendMessage = this.sendMessage.bind(this);
        props.onSendMessage = (messageFormData) => onSendMessage(messageFormData);
        const scrolledToTop = this.scrolledToTop.bind(this);
        props.scrolledToTop = () => scrolledToTop();
        return props;
    }

    protected init() {
        this.data = {
            socket: null,
            initStage: "init",
            unread: 0,
            users: {},
            messages: [],
            addedBottom: 0,
            addedTop: 0,
            endReached: true,
        };
        if (this.props.chat) {
            getChatUsers(this.props.chat!.id).then(chatUsers => {
                if (chatUsers !== false) {
                    chatUsers.forEach(user =>  this.data.users[user.id] = user);
                }
                this.data.messages.map(message => this.setMessageUser(message));
                this.messagesUpdated();
            }).catch(error => {
                processHTTPError(error);
            });
        }
        this.initSocket();
    }

    protected setMessageUser(message: Message) {
        if (this.data.users[message.userId]) {
            message.user = this.data.users[message.userId] as User;
        }
    }

    protected onOpen () {
        if ( this.data.initStage === "init") {
            this.refs.dialogList.lock();
            this.data.initStage = "unread";
            this.requestUnread();
        }
    }

    protected requestUnread() {
        getChatNewMessagesCount(this.props.chat!.id).then((unreadCount: number) => {
            this.data.unread = unreadCount;
            this.getMoreMessages();
        }).catch(error => {
            processHTTPError(error);
        });
    }

    protected getMoreMessages() {
        this.data.socket?.getOld( this.data.messages.length);
    }

    protected addMessages(newMessages: Message[]) {
        if (this.data.initStage === "unread" || this.data.initStage === "") {
            let addedToStart = 0;
            if (this.data.initStage === "unread" && newMessages.length === 0)
                this.data.initStage = "ready";
            newMessages.forEach(newMessage => {
                newMessage.isOwner = this.props.user.id === newMessage.userId;
                newMessage.dateLabel = formatDate(newMessage.time, "d M");
                this.setMessageUser(newMessage);
                if (this.data.messages.length > 0 && newMessage.time > this.data.messages[0].time) {
                    this.data.addedBottom++;
                    this.data.messages.push(newMessage);
                }
                else {
                    this.data.messages.unshift(newMessage);
                    this.data.addedTop++;
                    addedToStart++;
                }
            });

            if (addedToStart === 20) {
                this.data.endReached = false;
            }
            else if (addedToStart !== 0) {
                this.data.endReached = true;
            }

            if (this.data.initStage === "unread")
                this.data.unread -= addedToStart;

            if (this.data.initStage === "unread") {
                if (this.data.unread > -1) {
                    this.getMoreMessages();
                } else {
                    this.data.initStage = "ready";
                }
            }
        }
        if (this.data.initStage === "ready") {
            this.data.initStage = "";
            if (this.refs.dialogList) {
                this.refs.dialogList.unlock();
            }
            this.messagesUpdated();
            return;
        }
        if (newMessages.length > 0)
            this.messagesUpdated();
    }

    // protected onError (event: Event) {
    //
    // }
    //
    //
    // protected onClose (event: CloseEvent) {
    //
    // }

    protected componentPropsUpdated() {
        if (!this.props.chat) {
            this.killSocket();
        }
    }

    protected initSocket() {
        if (!this.data.socket && this.props.chat) {
            this.data.socket = new ChatSocket({
                chatId: this.props.chat.id,
                userId: this.props.user.id,
                onOpen: () => this.onOpen(),
                onAddMessages: (messages) => this.addMessages(messages),
                // onError: (event: Event) => this.onError(event),
                // onClose: (event: CloseEvent) => this.onClose(event),
            });
        }
    }

    protected componentWillUnmount() {
        super.componentWillUnmount();
    }

    protected killSocket() {
        if (this.data.socket) {
            this.data.socket.close();
            this.data.socket = null;
        }
    }

    public modalShow(e: NodeEvent<HTMLElement>) {
        if (e.target.dataset.modal + "Form" in this.refs)
            this.refs[e.target.dataset.modal + "Form"].show();
    }

    public scrolledToTop() {
        if (!this.data.endReached) {
            this.data.endReached = true;
            this.getMoreMessages();
        }
    }

    public sendMessage(messageFormData: MessageFormData) {
        if (isPlainObject(messageFormData) && messageFormData.message) {
            this.data.socket?.sendData({
                content: messageFormData.message,
                type: "message"
            });
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    public destroy() {
        this.killSocket();
        super.destroy();
    }

    protected messagesUpdated() {
        let lastDate = "";
        this.data.messages.forEach(message => {
            if (!message.dateLabel)
                return;
            message.showDateLabel = message.dateLabel !== lastDate;
            if (message.showDateLabel)
                lastDate = message.dateLabel;
        });
        if (this.refs.dialogList) {
            this.refs.dialogList.setProps({
                messages: cloneDeep(this.data.messages),
                addedTop: this.data.addedTop,
                addedBottom: this.data.addedBottom,
                endReached: this.data.endReached,
            });
            this.data.addedTop = 0;
            this.data.addedBottom = 0;
        }
    }

    protected componentWillMount() {
        super.componentWillMount();
        this.messagesUpdated();
    }
}

export default connect(({chat, user}) => ({chat, user}))(Dialog);
