import Block from "../../core/Block";
import {Props, NodeEvent, User} from "../../types/types";
import template from "./search-list.hbs?raw";

interface IProps extends Props {
    list: User[],
    showNoResult?: boolean,
    hasResult?: boolean
}

export default class SearchList extends Block <IProps> {
    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onSelect = this.select.bind(this);
        props.events = {
            click: (e: NodeEvent<HTMLElement>) => onSelect(e),
        };
        return props;
    }

    private select(e: NodeEvent<HTMLElement>) {
        if (typeof this.props.onSelect == "function") {
            const dataNode = e.target.closest(".search-list__item");
            if (!(dataNode instanceof HTMLElement))
                this.props.onSelect(null);
            else {
                const selectedData: Record<string, string | undefined> | null = dataNode.dataset.id ? {
                    id: dataNode.dataset.id,
                    login: dataNode.dataset.login,
                    firstName: dataNode.dataset.firstName,
                    secondName: dataNode.dataset.secondName
                } : null;
                this.props.onSelect(selectedData);
                this.setProps({
                    list: [],
                    hasResult: false,
                    showNoResult: false,
                } as IProps);
            }
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
