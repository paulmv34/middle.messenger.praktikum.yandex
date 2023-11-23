import Block from "../../core/Block";
import {NodeEvent, Props} from "../../types/types";
import template from "./profile-avatar.hbs?raw";

interface IProps extends Props {
    src: string,
    alt: string,
    page: string,
    onClick?: (e: NodeEvent<HTMLElement>) => void,
}

export default class ProfileAvatar extends Block<IProps> {
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
