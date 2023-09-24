import Block from "../../core/Block";
import { BlockProps } from "../../types/main.types";
import template from "./form.hbs?raw";

interface IProps extends BlockProps { }

export default class Form extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
