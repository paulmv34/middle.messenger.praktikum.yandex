import Block from "../../core/Block";
import template from './profile-fieldset.hbs?raw';

interface IProps {
    fields: IField[]
}

export default class ProfileFieldset extends Block {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
