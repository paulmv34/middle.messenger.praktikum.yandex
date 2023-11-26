type QueueElement = {
    value: unknown,
    next: QueueElement | null,
    prev: QueueElement | null
}


export class Queue {
    private _size = 0;
    private _head: QueueElement | null = null;
    private _tail: QueueElement | null = null;

    constructor() {
        this._size = 0;
        this._head = null;
        this._tail = null;
    }

    enqueue(value: unknown): number {
        const node = { value, next: null, prev: null } as QueueElement;
        if (this._head && this._tail) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        else {
            this._head = node;
            this._tail = node;
        }
        this._size++;
        return this._size;
    }

    dequeue(): unknown {
        if (this.isEmpty() || !this._head)
            throw new Error("Queue is empty");
        const returnValue = this._head;
        if (this._head.next) {
            this._head = this._head.next;
            this._head.prev = null;
        }
        else {
            this._head = null;
            this._tail = null;
        }
        returnValue.next = null;
        this._size--;
        return returnValue;
    }

    get size():number {
        return this._size;
    }

    peek() {
        if (this.isEmpty() || !this._head)
            throw new Error("Queue is empty");
        return this._head.value;
    }

    isEmpty() {
        return !this._size;
    }
}
