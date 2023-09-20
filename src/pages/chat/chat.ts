import Block from "../../core/Block";
import template from './chat.hbs?raw';

interface IProps {
    title: string,
    contacts: IContacts,
    dialog: IDialog,
}

export default class ChatPage extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
