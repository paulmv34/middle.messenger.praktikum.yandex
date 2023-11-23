import Block from "../../core/Block";
import {Props, NodeEvent} from "../../types/types";
import template from "./fullscreen-form.hbs?raw";

interface IProps extends Props {
    back: string,
    narrow: boolean,
    caption?: string,
    onClick?: (e: NodeEvent<HTMLElement>) => void,
}

export default class FullscreenForm extends Block<IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.events = {
            click: typeof (props.onClick) == "function" ? props.onClick : (() => {})
        };
        return props;
    }

    public componentWillMount() {
        if (this.element) {
            this.eventTarget = this.element.querySelector(".fullscreen-form__scroll");
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
