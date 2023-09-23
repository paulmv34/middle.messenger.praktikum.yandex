import Block from "../../core/Block";
import { BlockProps, IContacts } from "../../types/main.types";
import template from "./contacts.hbs?raw";

interface IProps extends IContacts, BlockProps {}

export default class Contacts extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
