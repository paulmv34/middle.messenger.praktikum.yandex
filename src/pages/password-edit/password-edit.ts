import Block from "../../core/Block";
import {Props, IButton, IField, NodeEvent, RefType, ValueString} from "../../types/types";
import template from "./password-edit.hbs?raw";
import {editPassword} from "../../services/user";
import {ChangePassword} from "../../api/type";
import {PasswordEditPageContext} from "../../main.data";
import FormField from "../../components/form-field/form-field";
import {cloneDeep} from "../../utils/cloneDeep";
import {isAuthError} from "../../core/processHTTPError";
import {authLost} from "../../core/authLost";

interface IProps extends Props {
    title?: string,
    caption?: string,
    back?: string,
    errorText?: string,
    oldPasswordField?: IField<ValueString>,
    newPasswordField?: IField<ValueString>,
    newPasswordRepeatField?: IField<ValueString>,
    submitButton?: IButton,
    onSubmit?: (e: NodeEvent<HTMLButtonElement>) => void,
}

interface IRefs extends RefType {
    oldPassword: FormField,
    newPassword: FormField,
    newPasswordRepeat: FormField,
}

export default class PasswordEditPage extends Block<IProps, IRefs> {
    static authRequired = "yes";

    constructor(props: IProps = {}) {
        super(Object.assign(props, cloneDeep(PasswordEditPageContext)));
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onSubmit = this.submit.bind(this);
        props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
        return props;
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        const values = this.value();
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
        }
        else {
            let errorText = "";
            let hasAuthError = false;
            const value = this.value();
            editPassword({oldPassword: value.oldPassword, newPassword: value.newPassword} as ChangePassword).then(() => {
                this.refs.oldPassword.setProps({value: ""});
                this.refs.newPassword.setProps({value: ""});
                this.refs.newPasswordRepeat.setProps({value: ""});
            }).catch(error => {
                hasAuthError = isAuthError(error);
                errorText = error;
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
