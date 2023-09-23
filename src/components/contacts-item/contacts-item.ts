import Block from "../../core/Block";
import template from "./contacts-item.hbs?raw";

interface IProps extends IContactsListItem { }

export default class ContactsItem extends Block {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
