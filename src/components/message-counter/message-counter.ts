import Block from "../../core/Block";
import template from "./message-counter.hbs?raw";

interface IProps {
    count: number,
}

export default class MessageCounter extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
