import Block from "../../core/Block";
import {Props, Message, RefType, BlockData} from "../../types/types";
import template from "./dialog-list.hbs?raw";

interface IProps extends Props {
    messages: Message[],
    addedBottom: 0,
    addedTop: 0,
    endReached: boolean,
    scrolledToTop: () => void;
}

interface IBlockData extends BlockData {
    locked: boolean;
    scrollPos: number;
    height: number;
}

export default class DialogList extends Block<IProps, RefType, IBlockData> {
    constructor(props: IProps = {} as IProps) {
        if (!props.messages) {
            props.messages = [];
        }
        if (!props.addedTop) {
            props.addedTop = 0;
        }
        if (!props.addedBottom) {
            props.addedBottom = 0;
        }
        super(props);
    }

    protected modifyProps(props: IProps = {} as IProps): IProps {
        const onScroll = this.scroll.bind(this);
        props.events = {
            scroll: () => onScroll()
        };
        return props;
    }

    protected init() {
        this.data = {
            locked: false,
            scrollPos: 0,
            height: 0,
        };
    }

    protected scroll() {
        this.data.scrollPos = this.getElement()!.scrollTop;
        if (this.data.scrollPos < 100 && !this.props.endReached && this.props.scrolledToTop) {
            this.props.scrolledToTop();
        }
    }

    protected getHeight() {
        return Math.max(0, this.getElement()!.scrollHeight - this.getElement()!.getBoundingClientRect().height);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    public lock() {
        this.data.locked = true;
    }

    public scrollToActual() {
        const newHeight = this.getHeight();
        if (this.props.addedTop > 0) {
            this.getElement()!.scrollTop = newHeight - this.data.height;
        }
        else if (this.props.addedBottom > 0) {
            if (this.data.scrollPos + 100 > newHeight) {
                this.getElement()!.scrollTop = newHeight;
            }
            else {
                this.getElement()!.scrollTop = this.data.scrollPos;
            }
        }
        else {
            this.getElement()!.scrollTop = this.data.scrollPos;
        }
        this.data.scrollPos = this.getElement()!.scrollTop;
        this.data.height = newHeight;
        this.props.addedTop = 0;
        this.props.addedBottom = 0;
    }

    public unlock() {
        this.data.locked = false;
    }

    protected componentWillMount() {
        super.componentWillMount();
        this.scrollToActual();
    }
}
