import Block from "../../core/Block";
import { BlockProps, IDialogMessage } from "../../types/main.types";
import template from "./dialog-list.hbs?raw";

interface IProps extends BlockProps {
    messages: IDialogMessage[]
}

export default class DialogList extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
