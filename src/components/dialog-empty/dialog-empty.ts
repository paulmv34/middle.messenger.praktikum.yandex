import Block from "../../core/Block";
import template from './dialog-empty.hbs?raw';

interface IProps { }

export default class DialogEmpty extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
