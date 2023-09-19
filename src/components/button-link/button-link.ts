import Block from "../../core/Block";
import template from './button-link.hbs?raw';

interface IProps {
    label: string,
    color?: 'red',
    name: string,
    page: string,
    onClick: () => void
}

export default class ButtonLink extends Block {
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
