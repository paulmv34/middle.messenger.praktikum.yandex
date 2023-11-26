import Block from "../../core/Block";
import {Props, NodeEvent, Chat} from "../../types/types";
import template from "./dialog-contact.hbs?raw";

interface IProps extends Chat, Props {
    onModalShow: (e: NodeEvent<HTMLElement>) => void,
}

export default class DialogContact extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
