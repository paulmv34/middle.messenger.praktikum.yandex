import EventBus from "./EventBus";
import {nanoid} from "nanoid";
import Handlebars from "handlebars";
import {BlockProps, Events, HandlebarsHelperEmbed} from "../types/main.types";

// Нельзя создавать экземпляр данного класса
export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    protected props: BlockProps;
    protected _meta: BlockProps;
    protected refs: Record<string, Block> = {};
    protected children: Record<string, Block>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _eventTarget: HTMLElement | null = null;
    private _partial: HTMLElement | null = null;
    protected input: HTMLInputElement | null = null;

    constructor(propsWithChildren: BlockProps = {}) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: Record<string, unknown>) {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {props, children};
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        if (oldProps.events || newProps.events)
            return true;
        return oldProps !== newProps;
    }

    protected unmountComponent() {
        if (this._element) {
            this._componentWillUnmount();
            this._removeEvents();
            for (const child of Object.values(this.children).reverse()) child.unmountComponent();
        }
    }

    private mountComponent() {
        this.componentWillMount();
        this._addEvents();
        this._componentDidMount();
    }

    private _addEvents() {
        const {events = {}} = this.props as { events: Events };

        Object.keys(events).forEach(eventName => {
            if (typeof (events[eventName]) == "function")
                this.eventTarget?.addEventListener(eventName, events[eventName]);
        });
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    protected componentWillUnmount() {
    }

    private _removeEvents() {
        const {events = {}} = this.props as { events: Events };

        for (const eventName of Object.keys(events)) {
            if (typeof (events[eventName]) == "function")
                this.eventTarget?.removeEventListener(eventName, events[eventName]);
        }
    }

    public setProps = (nextProps: BlockProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
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

        const fragment = this.render();

        const newElement = fragment?.firstElementChild as HTMLElement;
        
        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        const newPartial = newElement?.querySelector(`[data-partial-block="${this.id}"]`);
        if (newPartial && newPartial instanceof HTMLElement) {
            this._partial = newPartial;
        }

        this.mountComponent();
    }

    protected compile(templateString: string, context: Record<string,unknown>) {
        const contextAndStubs: {__refs: Record<string, Block>, __children?: HandlebarsHelperEmbed[]} = {...context, __refs: this.refs};
        const template = Handlebars.compile(this.makePartialBlockContainer(templateString));
        const html = template(contextAndStubs);
        const temp = document.createElement("template");
        temp.innerHTML = html;

        contextAndStubs.__children?.forEach(({embed}) => {
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

    getContent() {
        return this.content;
    }

    getElement() {
        return this.element;
    }

    _makePropsProxy(props: BlockProps) {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target, prop: string, value) => {
                const oldTarget = {...target};
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error("Нет доступа");
            }
        });
    }

    public isValid(): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public setError(value: string | undefined = undefined) {
        
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public validate(value?: string| undefined): boolean {
        return this.validateChildren();
    }

    public validateChildren(): boolean {
        return Object.values(this.refs).reduce((isValid, ref) => ref.validate() && isValid, true);
    }

    public value(): Record<string, string> {
        return this.valueChildren();
    }

    public valueChildren(): Record<string, string> {
        return Object.values(this.refs).reduce((values, ref) => Object.assign(values, ref.value()), {});
    }

    show() {
        this.getElement()!.style.display = "block";
    }

    hide() {
        this.getElement()!.style.display = "none";
    }
}
