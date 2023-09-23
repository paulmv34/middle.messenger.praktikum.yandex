import Block from "../../core/Block";
import template from "./profile.hbs?raw";

interface IProps { }

export default class Profile extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
