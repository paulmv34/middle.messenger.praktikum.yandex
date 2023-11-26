import Block from "../../core/Block";
import {Props, NodeEvent} from "../../types/types";
import template from "./error.hbs?raw";
import {connect} from "../../utils/connect";

interface IProps extends Props {
    errorInfo: Record<string, number | string>,
    onClick?: (e: NodeEvent<HTMLElement>) => void,
}

export class ErrorPage extends Block<IProps> {
    static authRequired = "any";

    protected modifyProps(props: IProps = {} as IProps): IProps {
        props.events = {
            click: props.onClick || (() => {})
        };
        return props;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default connect(({errorInfo}) => ({errorInfo}))(ErrorPage);
