import Block from "../../core/Block";
import { BlockProps } from "../../types/main.types";
import template from "./caption.hbs?raw";

interface IProps extends BlockProps{
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
