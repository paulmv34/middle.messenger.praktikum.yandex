import Block from "../../core/Block";
import template from './profile-avatar.hbs?raw';

interface IProps {
    src: string,
    alt: string,
    page: string,
}

export default class ProfileAvatar extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
