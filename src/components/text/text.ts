import Block from "../../core/Block";
import { BlockProps } from "../../types/main.types";
import template from "./text.hbs?raw";

interface IProps extends BlockProps {
    text: string,
    align: "center",
}

export default class Text extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
