import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./message-avatar.hbs?raw";

interface IProps extends Props {
    online: boolean,
    src: string,
    alt: string,
}

export default class MessageAvatar extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
