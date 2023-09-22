import Block from "../../core/Block";
import template from './dialog-list.hbs?raw';

interface IProps {
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
