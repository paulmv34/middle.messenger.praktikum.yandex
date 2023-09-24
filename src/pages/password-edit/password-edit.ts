import Block from "../../core/Block";
import { BlockProps, IButton, IField, NodeEvent } from "../../types/main.types";
import template from "./password-edit.hbs?raw";

interface IProps extends BlockProps {
    title?: string,
    caption?: string,
    back?: string,
    errorText?: string,
    oldPasswordField?: IField,
    newPasswordField?: IField,
    newPasswordRepeatField?: IField,
    submitButton?: IButton,
}

export default class PasswordEditPage extends Block {
    constructor(props: IProps) {
        super(props);
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        const values = this.value();
        console.log("Событие отправки формы");
        console.log(values);
        let hasError = !this.validate();
        if (values.newPassword !== values.newPasswordRepeat) {
            hasError = true;
            if (this.refs.newPassword && this.refs.newPassword.isValid())
                this.refs.newPassword.setError("Пароли не совпадают");
            if (this.refs.newPasswordRepeat && this.refs.newPasswordRepeat.isValid())
                this.refs.newPasswordRepeat.setError("Пароли не совпадают");
        }
        if (hasError) {
            this.props.errorText = "Форма заполнена с ошибками";
            console.log("Форма заполнена с ошибками");
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            console.log("Ошибок нет, разрешаем переход");
            this.props.errorText = "";
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
