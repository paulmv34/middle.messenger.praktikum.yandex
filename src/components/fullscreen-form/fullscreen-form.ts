import Block from "../../core/Block";
import template from './fullscreen-form.hbs?raw';

interface IProps {
    back: string,
    narrow: boolean,
    caption?: string,
    fields?: IField[],
    buttons?: IButton[],
}

export default class FullscreenForm extends Block {
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
