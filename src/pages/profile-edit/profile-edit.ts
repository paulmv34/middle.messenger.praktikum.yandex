import Block from "../../core/Block";
import template from "./profile-edit.hbs?raw";
import {ProfileEditPageContext} from "../../main.data";

interface IProps {
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
        this.props.onSubmit = (e) => onSubmit(e);
    }

    public submit(e) {
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
