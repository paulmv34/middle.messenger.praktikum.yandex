import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./message-counter.hbs?raw";

interface IProps extends Props {
    count: number,
}

export default class MessageCounter extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
