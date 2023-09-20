import Block from "../../core/Block";
import template from './message-avatar.hbs?raw';

interface IProps {
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
