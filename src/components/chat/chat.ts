import Block from "../../core/Block";
import { BlockProps, IChat } from "../../types/main.types";
import template from "./chat.hbs?raw";

interface IProps extends IChat, BlockProps {}

export default class Chat extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
