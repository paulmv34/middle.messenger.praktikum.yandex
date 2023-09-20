import Block from "../../core/Block";
import template from './container.hbs?raw';

interface IProps { }

export default class Container extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
