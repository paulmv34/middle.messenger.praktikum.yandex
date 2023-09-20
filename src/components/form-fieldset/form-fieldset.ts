import Block from "../../core/Block";
import template from './form-fieldset.hbs?raw';

interface IProps {
    fields: IField[]
}

export default class FormFieldset extends Block {
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
