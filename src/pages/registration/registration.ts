import Block from "../../core/Block";
import template from './registration.hbs?raw';

interface IProps {
    title: string,
    caption: string,
    fields: IField[],
    buttons: IButton[],
}

export default class RegistrationPage extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
