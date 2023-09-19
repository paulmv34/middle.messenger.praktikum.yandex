import Block from "../../core/Block";
import template from './chat.hbs?raw';

// TODO
interface IProps {
    contacts: object,
    dialog: object,
}

export default class Chat extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}