import Block from "../../core/Block";
import template from './profile-field.hbs?raw';

interface IProps extends IField { }

export default class ProfileField extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
