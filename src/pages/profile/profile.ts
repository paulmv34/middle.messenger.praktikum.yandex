import Block from "../../core/Block";
import template from './profile.hbs?raw';

interface IProps {
    title: string,
    caption: string,
    back: string,
    avatar: {src: string, username: string},
    fields: string,
    buttons: string,
}

export default class ProfilePage extends Block {
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
