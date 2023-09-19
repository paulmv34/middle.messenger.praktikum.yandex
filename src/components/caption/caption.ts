import Block from "../../core/Block";
import template from './caption.hbs?raw';

interface IProps {
    text: string,
}

export default class Caption extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
