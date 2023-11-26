import Block from "../../core/Block";
import { Props } from "../../types/types";
import template from "./context-menu.hbs?raw";

interface IProps extends Props {}

export default class ContextMenu extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
