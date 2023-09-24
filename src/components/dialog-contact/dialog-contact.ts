import Block from "../../core/Block";
import { BlockProps, IDialogContact } from "../../types/main.types";
import template from "./dialog-contact.hbs?raw";

interface IProps extends IDialogContact, BlockProps { }

export default class DialogContact extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
