import Block from "../../core/Block";
import template from "./authorization.hbs?raw";
import {AuthorizationPageContext} from "../../main.data";
import {Props, IButton, IField, NodeEvent, RefType, ValueString} from "../../types/types";
import {signin} from "../../services/auth";
import {LoginRequestData} from "../../api/type";
import FormField from "../../components/form-field/form-field";
import {cloneDeep} from "../../utils/cloneDeep";
import {isAlreadyAuthError} from "../../core/processHTTPError";

interface IProps extends Props {
    title?: string,
    caption?: string,
    errorText?: string,
    loginField?: IField<ValueString>,
    passwordField?: IField<ValueString>,
    submitButton?: IButton,
    linkButton?: IButton,
    onSubmit?: (e: NodeEvent<HTMLButtonElement>) => void
}

interface IRefs extends RefType {
    login: FormField,
    password: FormField,
}

export default class AuthorizationPage extends Block <IProps, IRefs> {
    static authRequired = "no";

    constructor(props: IProps = {}) {
        super(Object.assign(props, cloneDeep(AuthorizationPageContext)) as IProps);
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onSubmit = this.submit.bind(this);
        props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
        return props;
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
            signin(this.value() as LoginRequestData).then(() => {
                this.refs.login.setProps({value: ""});
                this.refs.password.setProps({value: ""});
            }).catch(error => {
                alreadyAuth = isAlreadyAuthError(error);
                errorText = error.message;
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
