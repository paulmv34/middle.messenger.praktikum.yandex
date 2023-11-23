import Block from "../core/Block";
import {appStore, StoreEvents} from "../core/Store";
import {isEqual} from "./isEqual";
import {AppState, BlockData, Props, RefType} from "../types/types";

export function connect(mapStateToProps: (state: AppState) => Partial<AppState>) {
    return function<P extends Props, R extends RefType = RefType, D extends BlockData = BlockData>(Component: typeof Block<P, R, D>) {
        return class extends Component {
            private onChangeStoreCallback: () => void;

            constructor(props: P) {
                let state = mapStateToProps(appStore.getState());
                super({...props, ...state});

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(appStore.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({...newState} as P);
                    }

                    state = newState;
                };

                appStore.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            destroy() {
                appStore.off(StoreEvents.Updated, this.onChangeStoreCallback);
                super.destroy();
            }
        };
    };
}