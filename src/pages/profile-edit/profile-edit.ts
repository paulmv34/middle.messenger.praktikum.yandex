import Block from "../../core/Block";
import template from "./profile-edit.hbs?raw";
import {ProfileEditPageContext} from "../../main.data";
import { IField, IButton, NodeEvent, BlockProps } from "../../types/main.types";

interface IProps extends BlockProps {
    title?: string,
    caption?: string,
    errorText?: string,
    emailField?: IField,
    loginField?: IField,
    displayNameField?: IField,
    nameField?: IField,
    secondNameField?: IField,
    phoneField?: IField,
    submitButton?: IButton,
    //onSubmit?: (e):
}

export default class ProfileEditPage extends Block {
    constructor(props: IProps) {
        const initialProps = ProfileEditPageContext;
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
