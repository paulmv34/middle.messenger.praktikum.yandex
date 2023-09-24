import Block from "../../core/Block";
import { BlockProps } from "../../types/main.types";
import template from "./contacts-head.hbs?raw";

interface IProps extends BlockProps {
    search: string,
}

export default class ContactsHead extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
