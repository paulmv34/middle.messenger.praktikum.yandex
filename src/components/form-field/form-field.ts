import Block from "../../core/Block";
import template from './form-field.hbs?raw';

interface IProps extends IField { }

export default class FormField extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
