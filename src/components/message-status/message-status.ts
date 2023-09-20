import Block from "../../core/Block";
import template from './message-status.hbs?raw';

interface IProps {
    date: number,
    status: MessageStatuses,
}

export default class MessageStatus extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
