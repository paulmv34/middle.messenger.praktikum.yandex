import Block from "../../core/Block";
import template from "./modal-chat-avatar-form.hbs?raw";
import {ModalChatAvatarContext} from "../../main.data";
import {Props, IButton, IField, NodeEvent, RefType, ValueFile} from "../../types/types";
import {editChatAvatar} from "../../services/chat";
import {transformToFormData} from "../../utils/apiTransformers";
import FormField from "../form-field/form-field";
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

interface IRefs extends RefType {
    avatar: FormField
}

export default class ModalChatAvatarForm extends Block<IProps, IRefs> {
    static authRequired = "no";

    constructor(props: IProps = {} as IProps) {
        super(Object.assign(props, cloneDeep(ModalChatAvatarContext)) as IProps);
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
        this.refs.avatar.resetValue();
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
        if (!this.validate()) {
            this.props.errorText = "Форма заполнена с ошибками";
        } else {
            let errorText = "";
            let hasAuthError = false;
            editChatAvatar(this.props.chatId, transformToFormData(this.value())).then(() => {
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
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
