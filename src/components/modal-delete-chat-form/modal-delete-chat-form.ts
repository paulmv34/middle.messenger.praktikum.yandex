import Block from "../../core/Block";
import template from "./modal-delete-chat-form.hbs?raw";
import {ModalDeleteChatFormContext} from "../../main.data";
import {Props, IButton, IField, NodeEvent, ValueFile} from "../../types/types";
import {deleteChat} from "../../services/chat";
import {cloneDeep} from "../../utils/cloneDeep";
import {isAuthError} from "../../core/processHTTPError";
import {authLost} from "../../core/authLost";

interface IProps extends Props {
    caption?: string,
    errorText?: string,
    avatarField?: IField<ValueFile>,
    submitButton?: IButton,
    chatId: number
}

export default class ModalDeleteChatForm extends Block<IProps> {
    static authRequired = "no";

    constructor(props: IProps | undefined = {} as IProps) {
        super(Object.assign(props, cloneDeep(ModalDeleteChatFormContext)) as IProps);
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.hidden = true;
        const onSubmit = this.submit.bind(this);
        const onClose = this.close.bind(this);
        props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
        props.onClose = (e: NodeEvent<HTMLButtonElement>) => onClose(e);
        return props;
    }

    public show() {
        super.show();
    }

    public close(e: NodeEvent<HTMLButtonElement>) {
        e.stopPropagation();
        if (e.target.matches(".close-button_modal-close,.fullscreen-form__scroll"))
            this.hide();
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        let errorText = "";
        let hasAuthError = false;
        deleteChat(this.props.chatId).then(() => {
            this.hide();
        }).catch(error => {
            hasAuthError = isAuthError(error);
            errorText = error.message;
        }).finally(() => {
            this.props.errorText = errorText;
            if (hasAuthError)
                authLost();
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
