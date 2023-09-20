import Block from "../../core/Block";
import template from './page.hbs?raw';

interface IProps { }

export default class Page extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
