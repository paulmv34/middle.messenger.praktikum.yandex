type StackElement = {
    value: unknown,
    next: StackElement | null,
    prev: StackElement | null
}

export class Stack {
    private _size = 0;
    //private _head: StackElement | null = null;
    private _tail: StackElement | null = null;

    constructor() {
        this._size = 0;
        //this._head = null;
        this._tail = null;
    }

    push(value: unknown) {
        const node = { value, next: null, prev: null } as StackElement;
        const prev = this._tail;
        this._tail = node;
        if (prev) {
            this._tail.prev = prev;
            prev.next = this._tail;
        }
        // else {
        //     this._head = node;
        // }
        this._size++;
        return this._size;
    }

    get size() {
        return this._size;
    }

    pop() {
        if (this._size === 0 || !this._tail)
            throw new Error("Stack is empty");
        const lastEl = this._tail.value;
        if (this._tail.prev)
            this._tail = this._tail.prev;
        else {
            this._tail = null;
            //this._head = null;
        }
        this._size--;
        return lastEl;
    }

    peek() {
        if (this._tail)
            return this._tail;
        throw new Error("Stack is empty");
    }

    isEmpty() {
        return !this._size;
    }
}