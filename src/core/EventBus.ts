
// Не нашел способ заменить any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener<T extends any[] = any[]> = (...args: T) => void;

// Не нашел способ заменить any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, any[]>> {
    private listeners: { [key in E]?: Listener<M[E]>[] } = {};

    on(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }

    off(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event] = this.listeners[event]!.filter(
            listener => listener !== callback,
        );
    }

    emit(event: E, ...args: M[E]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event]!.forEach(function (listener) {
            listener(...args);
        });
    }

    destroy() {
        this.listeners = {};
    }
}

