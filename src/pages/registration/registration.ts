import Block from "../../core/Block";
import template from "./registration.hbs?raw";
import {RegistrationPageContext} from "../../main.data";
import {Props, IField, IButton, NodeEvent, RefType, ValueString} from "../../types/types";
import { CreateUser} from "../../api/type";
import {signup} from "../../services/auth";
import FormField from "../../components/form-field/form-field";
import {isAlreadyAuthError} from "../../core/processHTTPError";

interface IProps extends Props  {
    title?: string,
    caption?: string,
    errorText?: string,
    emailField?: IField<ValueString>,
    loginField?: IField<ValueString>,
    nameField?: IField<ValueString>,
    secondNameField?: IField<ValueString>,
    phoneField?: IField<ValueString>,
    passwordField?: IField<ValueString>,
    passwordRepeatField?: IField<ValueString>,
    submitButton?: IButton,
    linkButton?: IButton,
}

interface IRefs extends RefType  {
    email: FormField,
    login: FormField,
    name: FormField,
    secondName: FormField,
    phone: FormField,
    password: FormField,
    passwordRepeat: FormField,
}

export default class RegistrationPage extends Block<IProps, IRefs> {
    static authRequired = "no";

    constructor(props: IProps = {}) {
        const initialProps = RegistrationPageContext as IProps;
        if (props.errorText)
            initialProps.errorText = props.errorText;
        super(initialProps);
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.validate()) {
            this.props.errorText = "Форма заполнена с ошибками";
        }
        else {
            let errorText = "";
            let alreadyAuth = false;
            signup(this.value() as CreateUser).then(() => {
                this.refs.email.setProps({value: ""});
                this.refs.login.setProps({value: ""});
                this.refs.name.setProps({value: ""});
                this.refs.secondName.setProps({value: ""});
                this.refs.phone.setProps({value: ""});
                this.refs.password.setProps({value: ""});
                this.refs.passwordRepeat.setProps({value: ""});
            }).catch(error => {
                errorText = error;
                alreadyAuth = isAlreadyAuthError(error);
            }).finally(() => {
                this.props.errorText = errorText;
                if (alreadyAuth)
                    document.location.reload();
            });
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
