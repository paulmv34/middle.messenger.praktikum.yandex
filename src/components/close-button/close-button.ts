import Block from "../../core/Block";
import {Props, IButton, NodeEvent} from "../../types/types";
import template from "./close-button.hbs?raw";

interface IProps extends IButton, Props {
    onClick?: (e: NodeEvent<HTMLElement>) => void,
}

export default class CloseButton extends Block<IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.events = {
            click: typeof (props.onClick) == "function" ? props.onClick : (() => {})
        };
        return props;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
