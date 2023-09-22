import Block from "../../core/Block";
import template from './profile-fieldset.hbs?raw';

interface IProps {
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
