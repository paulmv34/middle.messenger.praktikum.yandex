import {isEqual} from "../utils/isEqual";
import Block from "./Block";
import {AppState, isRegex, Props, RefType} from "../types/types";
import {appStore} from "./Store";

interface IRouteItem extends Record<string, unknown>{
    route: Route;
    onRoute?: (data: Record<string, string>) => boolean;
    onLeave?: () => void;
    args: Record<string, string>;
}

type RouterUseArguments = {
    pathname: string | RegExp;
    block: typeof Block<Props, RefType>;
    asStartRoute?: boolean;
    asErrorRoute?: boolean;
    onRoute?: (data: Record<string, string>) => boolean;
    onLeave?: () => void;
}

class Route {
    protected _pathname: string | RegExp;
    protected _blockClass: typeof Block<Props, RefType>;
    protected _block: Block<Props, RefType> | null;
    protected _rootQuery: string;

    constructor(pathname: string | RegExp, view: typeof Block<Props, RefType>, rootQuery: string) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._rootQuery = rootQuery;
    }

    authRequired() {
        return this._blockClass.authRequired;
    }

    leave() {
        if (this._block) {
            this._block.destroy();
            this._block = null;
        }
    }

    match(pathname: string) {
        if (isRegex(this._pathname)) {
            return this._pathname.test(pathname);
        }
        else
            return isEqual(pathname, this._pathname);
    }

    getArguments(pathname: string): Record<string, string> {
        if (isRegex(this._pathname)) {
            const matches = this._pathname.exec(pathname);
            if (matches && matches.groups)
                return matches.groups;
            return {};
        }
        else
            return {};
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            const element = this._block.getElement();
            const appRoot =  document.querySelector(this._rootQuery);
            if (appRoot && element)
                appRoot.append(element);
            return;
        }
    }
}

export class Router {
    protected routes: IRouteItem[] = [];
    protected history: History = window.history;
    protected _errorRoute: null | IRouteItem = null;
    protected _startRoute: null | IRouteItem = null;
    protected _currentRoute: null | IRouteItem = null;
    protected _rootQuery: string = "";
    static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use({pathname, block, asStartRoute = false, asErrorRoute = false, onRoute = () => true, onLeave = () => {}}: RouterUseArguments) {
        const route = new Route(pathname, block, this._rootQuery);
        const routeItem = {
            onRoute,
            onLeave,
            route,
            args: {}
        };
        if (!this._startRoute || asStartRoute)
            this._startRoute = routeItem;
        if (asErrorRoute)
            this._errorRoute = routeItem;
        this.routes.push(routeItem);
        return this;
    }

    start(onStart?: () => void) {
        window.addEventListener("popstate", event => {
            this.go(event.state.location, false);
        });
        if (typeof onStart == "function")
            onStart();
    }

    _onRoute(pathname: string) {
        let routeItem = this.getRoute(pathname);
        if (!routeItem) {
            console.warn(`No routes founded for path "${pathname}"`);
            return false;
        }

        if (this._currentRoute) {
            this._currentRoute.route.leave();
            if (typeof  this._currentRoute.onLeave == "function")
                this._currentRoute.onLeave();
        }

        if (typeof routeItem.onRoute == "function") {
            if (!routeItem.onRoute(routeItem.args) && this._errorRoute)
                routeItem = this._errorRoute;
        }

        this._currentRoute = routeItem;
        routeItem.route.render();
        return true;
    }

    showError() {
        if (!this._errorRoute)
            return;
        if (this._currentRoute) {
            this._currentRoute.route.leave();
            if (typeof  this._currentRoute.onLeave == "function")
                this._currentRoute.onLeave();
        }
        this._currentRoute = this._errorRoute;
        this._currentRoute.route.render();
    }

    go(pathname: string, addHistory = true) {
        if (this._onRoute(pathname) && addHistory) {
            this.history.pushState(
                {
                    location: pathname
                },
                "",
                pathname,
            );
        }
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    private get state(): AppState {
        return appStore.getState();
    }

    _findRoute(pathname: string) {
        let result = null;
        result = this.routes.find(routeItem => {
            if (routeItem == this._errorRoute)
                return null;
            const matched = routeItem.route.match(pathname);
            if (!matched)
                return null;
            routeItem.args = routeItem.route.getArguments(pathname);
            return routeItem;
        });
        if (!result)
            result = null;
        return result;
    }

    getRoute(pathname: string): IRouteItem | null {
        let targetRoute: IRouteItem | null = this._findRoute(pathname);
        if (!targetRoute)
            targetRoute = this._errorRoute;
        if (!targetRoute)
            return null;
        const authRequired = targetRoute.route.authRequired();
        if (authRequired === "yes") {
            if (this.state.user)
                return targetRoute;
            else
                return this._startRoute;
        }
        else if (authRequired === "no") {
            if (!this.state.user)
                return targetRoute;
            else
                return this._currentRoute;
        }
        else
            return targetRoute;
    }
}

export const appRouter = new Router("#app");
