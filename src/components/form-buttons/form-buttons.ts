import Block from "../../core/Block";
import { BlockProps, IButton } from "../../types/main.types";
import template from "./form-buttons.hbs?raw";

interface IProps extends BlockProps {
    buttons: IButton[]
}

export default class FormButtons extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
