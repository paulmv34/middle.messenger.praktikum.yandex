import Block from "../../core/Block";
import template from "./contacts.hbs?raw";

interface IProps extends IContacts {}

export default class Contacts extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
