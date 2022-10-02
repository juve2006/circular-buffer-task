class CircularBuffer {
    constructor(length) {
        this.buffer = new Array(length).fill(undefined); //[].length
        this.start = 0;
        this.end = 0;
        this.size = 0;
        this.lenght = length;
    };

    write(item) {
        if (this.isFull()) throw new BufferFullError();
        this.buffer[this.end] = item;
        this.end = (this.end + 1) % this.lenght;
        this.size++;
    };

    read() {
        if (this.isEmpty()) throw new BufferEmptyError();
        let item = this.buffer[this.start];
        this.buffer[this.start] = undefined;
        this.start = (this.start + 1) % this.lenght;
        this.size--;
        return item;
    };

    forceWrite(item) {
        try {
            this.write(item)
        } catch (err) {
            if (!typeof err === 'BufferFullError') { throw err}
            this.read()
            this.write(item)
        }
    }

    clear() {
        [this.buffer, this.start, this.end, this.size] = [new Array(this.lenght), 0, 0, 0];
    }


    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.lenght;
    }

}

export default CircularBuffer;

export class BufferFullError extends Error {
    constructor() {
        super('CircularBuffer is full');
    }
}

export class BufferEmptyError extends Error {
    constructor() {
        super('CircularBuffer is empty');
    }
}
