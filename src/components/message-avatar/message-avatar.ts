import Block from "../../core/Block";
import { BlockProps } from "../../types/main.types";
import template from "./message-avatar.hbs?raw";

interface IProps extends BlockProps {
    online: boolean,
    src: string,
    alt: string,
}

export default class MessageAvatar extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
