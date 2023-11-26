import EventBus from "./EventBus";
import {nanoid} from "nanoid";
import Handlebars from "handlebars";
import {Props, HandlebarsHelperEmbed, RefType, isPlainObject, BlockData} from "../types/types";
import {isEqual} from "../utils/isEqual";
import {componentManager} from "./ComponentManager";

export default class Block<P extends Props, R extends RefType = RefType, D extends BlockData = BlockData> {
    static authRequired = "any";

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: "flow:component-will-unmount",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    protected hidden: boolean = false;
    protected props: P = {} as P;
    protected refs: R = {} as R;
    // children из props
    protected children: Record<string, Block<P, R>>;
    private mounted: boolean = false;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _eventTarget: HTMLElement | null = null;
    private _partial: HTMLElement | null = null;
    // _children - дочерние компоненты после компилирования шаблона
    private _children: Record<string, Block<P, R>> = {};
    protected input: HTMLInputElement | null = null;
    private template: Handlebars.TemplateDelegate | null = null;
    private _propsUpdating: boolean = false;
    private _propsChangedOldProps: P | null = null;
    private _propsChangedNewProps: P | null = null;
    protected data: D = {} as D;

    constructor(props: P = {} as P) {
        props = this.modifyProps(props);
        const {props: _props, children: _children} = this._getChildrenAndProps(props);
        this.children = _children;

        const eventBus = new EventBus();
        this.props = this._makePropsProxy(_props);
        this.hidden = !!this.props.hidden;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        componentManager[this.id] = this;
        eventBus.emit(Block.EVENTS.INIT);
    }

    protected modifyProps(props: P = {} as P): P {
        return props;
    }

    private _getChildrenAndProps(childrenAndProps: P = {} as P) {
        const props: P = {} as P;
        const children: Record<string, Block<P, R>> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value as Block<P, R>;
            } else {
                props[key as keyof P] = value;
            }
        });

        return {props, children};
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {

    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {

    }

    protected componentWillMount() {

    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.componentPropsUpdated();
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentPropsUpdated() {

    }

    private beginPropsUpdating() {
        this._propsUpdating = true;
    }

    private _propsUpdated(oldProps: P, newProps: P) {
        if (this._propsChangedOldProps === null)
            this._propsChangedOldProps = oldProps;
        this._propsChangedNewProps = newProps;
    }

    private isPropsUpdating() {
        return this._propsUpdating;
    }

    private endPropsUpdating(silent: boolean = false) {
        this._propsUpdating = false;
        if (this._propsChangedOldProps !== null && this._propsChangedNewProps !== null) {
            if (!silent)
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._propsChangedOldProps, this._propsChangedNewProps);
            this._propsChangedOldProps = null;
            this._propsChangedNewProps = null;
        }
    }

    private componentDidUpdate(oldProps: P, newProps: P) {
        return !isEqual(oldProps, newProps);
    }

    private unmountComponent() {
        if (this.mounted) {
            this.mounted = false;
            if (this._element) {
                this._componentWillUnmount();
                this._removeEvents();
                for (const child of Object.values(this.children).reverse()) child.unmountComponent();
                for (const child of Object.values(this._children).reverse()) child.unmountComponent();
            }
        }
    }

    private unmountAndDestroyChildren() {
        if (this.mounted) {
            this.mounted = false;
            if (this._element) {
                this._componentWillUnmount();
                this._removeEvents();
            }
        }
        for (const child of Object.values(this.children).reverse()) {
            child.destroy();
        }
        for (const child of Object.values(this._children).reverse()) {
            child.destroy();
        }
    }

    private mountComponent() {
        if (!this.mounted) {
            this.mounted = true;
            this.componentWillMount();
            this._addEvents();
            this._componentDidMount();
        }
    }

    private _addEvents() {
        if (!isPlainObject(this.props.events))
            return;
        Object.entries(this.props.events).forEach(([eventName, eventFunction]) => {
            if (typeof (eventFunction) == "function" && this.eventTarget instanceof HTMLElement)
                this.eventTarget.addEventListener(eventName, eventFunction as EventListenerOrEventListenerObject);
        });
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    protected componentWillUnmount() {
        this.eventBus().off(Block.EVENTS.INIT, this._init.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _removeEvents() {
        if (!isPlainObject(this.props.events)) {
            return;
        }
        Object.entries(this.props.events).forEach(([eventName, eventFunction]) => {
            if (typeof (eventFunction) == "function" && this.eventTarget instanceof HTMLElement)
                this.eventTarget.removeEventListener(eventName, eventFunction as EventListenerOrEventListenerObject);
        });
    }

    public setProps = (nextProps: Record<string, unknown>, silent: boolean = false) => {
        if (!nextProps) {
            return;
        }
        this.beginPropsUpdating();
        Object.assign(this.props, nextProps);
        this.endPropsUpdating(silent);
    };

    get content() {
        return this._partial ? this._partial : this._element;
    }

    get element() {
        return this._element;
    }

    get eventTarget():HTMLElement | null {
        return this._eventTarget ? this._eventTarget : this._element;
    }

    set eventTarget(eventTarget) {
        this._eventTarget = eventTarget;
    }

    private _render() {
        this.unmountComponent();
        const oldChildren = this._children;
        const fragment = this.render();

        const newElement = fragment?.firstElementChild as HTMLElement;
        if (this.hidden)
            newElement.style.display = "none";
        if (this._element) {
            this._element.replaceWith(newElement);
        }

        for (const child of Object.values(oldChildren).reverse()) {
            child.destroy();
        }

        this._element = newElement;

        const newPartial = newElement?.querySelector(`[data-partial-block="${this.id}"]`);
        if (newPartial && newPartial instanceof HTMLElement) {
            this._partial = newPartial;
        }

        this.mountComponent();
    }

    protected compile(templateString: string, context: Record<string,unknown>) {
        this._children = {};
        const contextAndStubs:  {__refs: R, __children?: HandlebarsHelperEmbed<P, R>[]} = {...context, __refs: this.refs};
        if (!this.template)
            this.template = Handlebars.compile(this.makePartialBlockContainer(templateString));
        const html = this.template(contextAndStubs);
        const temp = document.createElement("template");
        temp.innerHTML = html;
        contextAndStubs.__children?.forEach(({component, embed}) => {
            if (component)
                this._children[component.id] = component;
            embed(temp.content);
        });

        return temp.content;
    }

    protected makePartialBlockContainer(templateString: string): string {
        return templateString.replace("{{> @partial-block }}", `<div data-partial-block="${this.id}"></div>`);
    }

    protected render(): DocumentFragment | null {
        return null;
    }

    public getContent() {
        return this.content;
    }

    public getElement() {
        return this.element;
    }

    private _makePropsProxy(props: P) {
        return new Proxy(props, {
            get: (target: P, prop: string) => {
                const value = target[prop as keyof P];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target: P, prop: string, value) => {
                const oldTarget = {...target};
                target[prop as keyof P] = value;
                if (!this.isPropsUpdating()) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                } else {
                    this._propsUpdated(oldTarget, target);
                }
                return true;
            },
            deleteProperty: () => {
                throw new Error("Нет доступа");
            }
        } as ProxyHandler<P>);
    }

    public validate(value: string | undefined = undefined, silent: boolean = false): boolean {
        return Object.values(this.refs).reduce((isValid, ref) => ref.validate(value, silent) && isValid, true);
    }

    public value(): Record<string, string | File> {
        return Object.values(this.refs).reduce((values, ref) => Object.assign(values, ref.value()), {});
    }

    public show() {
        this.hidden = false;
        this.getElement()!.style.display = "";
    }

    public hide() {
        this.hidden = true;
        this.getElement()!.style.display = "none";
    }

    public build() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    public destroy() {
        this.unmountAndDestroyChildren();
        this.getElement()?.remove();
        delete componentManager[this.id];
    }
}
