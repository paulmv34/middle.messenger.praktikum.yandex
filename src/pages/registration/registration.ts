import Block from "../../core/Block";
import template from "./registration.hbs?raw";
import {RegistrationPageContext} from "../../main.data";

interface IProps {
    title?: string,
    caption?: string,
    errorText?: string,
    emailField?: IField,
    loginField?: IField,
    nameField?: IField,
    secondNameField?: IField,
    phoneField?: IField,
    passwordField?: IField,
    passwordRepeatField?: IField,
    submitButton?: IButton,
    linkButton?: IButton,
}

export default class RegistrationPage extends Block {
    constructor(props: IProps) {
        const initialProps = RegistrationPageContext;
        if (props.errorText)
            initialProps.errorText = props.errorText;
        super(initialProps);
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e) => onSubmit(e);
    }

    public submit(e) {
        const values = this.value();
        console.log("Событие отправки формы");
        console.log(values);
        let hasError = !this.validate();
        if (values.password !== values.passwordRepeat) {
            hasError = true;
            if (this.refs.password && this.refs.password.isValid())
                this.refs.password.setError("Пароли не совпадают");
            if (this.refs.passwordRepeat && this.refs.passwordRepeat.isValid())
                this.refs.passwordRepeat.setError("Пароли не совпадают");
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
