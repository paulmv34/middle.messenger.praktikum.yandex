import Block from "../../core/Block";
import template from "./authorization.hbs?raw";
import {AuthorizationPageContext} from "../../main.data";
import { BlockProps, IButton, IField, NodeEvent } from "../../types/main.types";

interface IProps extends BlockProps {
    title?: string,
    caption?: string,
    errorText?: string,
    loginField?: IField,
    passwordField?: IField,
    submitButton?: IButton,
    linkButton?: IButton,
    //onSubmit?: (e):
}

export default class AuthorizationPage extends Block {
    constructor(props: IProps) {
        const initialProps = AuthorizationPageContext;
        if (props.errorText)
            initialProps.errorText = props.errorText;
        super(initialProps);
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e: NodeEvent<HTMLButtonElement>) => onSubmit(e);
    }

    public submit(e: NodeEvent<HTMLButtonElement>) {
        console.log("Событие отправки формы");
        console.log(this.value());
        if (!this.validate()) {
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
