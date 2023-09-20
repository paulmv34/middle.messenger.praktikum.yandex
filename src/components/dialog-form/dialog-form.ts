import Block from "../../core/Block";
import template from './dialog-form.hbs?raw';

interface IProps extends IDialogForm { }

export default class DialogForm extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
