import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";
import {type} from "os";

// Нельзя создавать экземпляр данного класса
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  protected props: Record<string, unknown>;
  protected refs: Record<string, Block> = {};
  protected children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _eventTarget: HTMLElement | null = null;
  private _partial: HTMLElement | null = null;
  private _meta: { props: any; };

  constructor(propsWithChildren: any = {}) {
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

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
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

  componentDidMount() {}

  componentWillMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true;
    //return oldProps && newProps ? true : true;
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
    const {events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      if (typeof(events[eventName]) == 'function')
        this.eventTarget?.addEventListener(eventName, events[eventName]);
    });
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  protected componentWillUnmount() {}

  private _removeEvents() {
    const {events = {}} = this.props;

    for (const eventName of Object.keys(events)) {
      if (typeof(events[eventName]) == 'function')
        this.eventTarget?.removeEventListener(eventName, events[eventName]);
    }
  }

  public setProps = (nextProps: any) => {
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

  get eventTarget() {
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

    const newPartial = newElement.querySelector(`[data-partial-block="${this.id}"]`);
    if (newPartial && newPartial instanceof HTMLElement) {
      this._partial = newPartial;
    }

    this.mountComponent();
  }

  protected compile(templateString: string, context: any) {
    const contextAndStubs = {...context, __refs: this.refs};
    const template = Handlebars.compile(this.makePartialBlockContainer(templateString));
    const html = template(contextAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({embed}: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected makePartialBlockContainer(templateString: string): string {
    return templateString.replace('{{> @partial-block }}', `<div data-partial-block="${this.id}"></div>`);
  }

  protected render(): DocumentFragment  | null {
    return null;
  }

  getContent() {
    return this.content;
  }

  getElement() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) =>  {
        const oldTarget = {...target}
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

  public validate(value: string = ''): boolean {
    return this.validateChildren();
  }

  public validateChildren(): boolean {
    return Object.values(this.refs).reduce((isValid, ref) => ref.validate() && isValid, true);
  }

  public value(): object {
    return this.valueChildren();
  }

  public valueChildren(): object {
    return Object.values(this.refs).reduce((values, ref) => Object.assign(values, ref.value()), {});
  }

  show() {
    this.getElement()!.style.display = "block";
  }

  hide() {
    this.getElement()!.style.display = "none";
  }
}