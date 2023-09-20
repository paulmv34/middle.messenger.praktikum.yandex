import Block from "../../core/Block";
import template from './authorization.hbs?raw';

interface IProps {
    title: string,
    caption: string,
    fields: IField[],
    buttons: IButton[],
}

export default class AuthorizationPage extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
