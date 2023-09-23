import Block from "../../core/Block";
import template from "./form-buttons.hbs?raw";

interface IProps {
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
