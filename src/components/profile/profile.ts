import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./profile.hbs?raw";

interface IProps extends Props { }

export default class Profile extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
