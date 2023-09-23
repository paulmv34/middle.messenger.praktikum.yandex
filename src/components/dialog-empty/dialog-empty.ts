import Block from "../../core/Block";
import { BlockProps } from "../../types/main.types";
import template from "./dialog-empty.hbs?raw";

interface IProps extends BlockProps { }

export default class DialogEmpty extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
