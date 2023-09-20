import Block from "../../core/Block";
import template from './form.hbs?raw';

interface IProps { }

export default class Form extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
