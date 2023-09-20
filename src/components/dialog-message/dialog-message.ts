import Block from "../../core/Block";
import template from './dialog-message.hbs?raw';

interface IProps extends IDialogMessage{ }

export default class DialogMessage extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
