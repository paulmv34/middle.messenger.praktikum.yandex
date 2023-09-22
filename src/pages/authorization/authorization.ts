import Block from "../../core/Block";
import template from './authorization.hbs?raw';
import {AuthorizationPageContext} from "../../main.data";

interface IProps {
    title?: string,
    caption?: string,
    errorText?: string,
    loginField?: IField,
    passwordField?: IField,
    loginButton?: IButton,
    registerButton?: IButton,
    onSubmit?: () => {}
}

export default class AuthorizationPage extends Block {
    constructor(props: IProps) {
        let initialProps = AuthorizationPageContext;
        super(initialProps);
        const onSubmit = this.submit.bind(this);
        this.props.onSubmit = (e) => onSubmit(e);
    }

    public componentWillMount() {

    }

    public submit(e) {
        console.log('Событие отправки формы');
        console.log(this.value());
        if (!this.validate()) {
            this.props.errorText = 'Форма заполнена с ошибками';
            e.preventDefault();
            e.stopPropagation();
        }
        else
            this.props.errorText = '';
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
