import EventBus from "./EventBus";
import {AppState} from "../types/types";
import {cloneDeep} from "../utils/cloneDeep";

export enum StoreEvents {
    Updated = "updated"
}

const initState: AppState = {
    user: null,
    chats: [],
    chat: null,
    errorInfo: {}
};

export class Store<State extends AppState> extends EventBus {
    private state: State;
    private readonly defaultState: State;

    constructor(defaultState: State) {
        super();
        this.state = defaultState;
        this.defaultState = cloneDeep(defaultState) as State;
        this.set(defaultState);
    }

    public getState(): State {
        return cloneDeep(this.state) as State;
    }

    public set(nextState: Partial<State>) {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }

    public clear() {
        this.set(this.defaultState);
    }
}

export const appStore = new Store<AppState>(initState);