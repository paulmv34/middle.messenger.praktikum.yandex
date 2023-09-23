import Block from "../../core/Block";
import template from "./profile-buttons.hbs?raw";

interface IProps {
    buttons: IButton[]
}

export default class ProfileButtons extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
