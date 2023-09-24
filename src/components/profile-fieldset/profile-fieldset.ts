import Block from "../../core/Block";
import { BlockProps, IField } from "../../types/main.types";
import template from "./profile-fieldset.hbs?raw";

interface IProps extends BlockProps {
    fields: IField[]
}

export default class ProfileFieldset extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
