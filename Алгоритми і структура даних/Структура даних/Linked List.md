## LinkedList

```js
class LinkedList {
    #head = null;
    #tail = null;

    add(node) {
        if (!this.#head) {
            this.#head = node;
            return;
        }

        if (!this.#tail) {
            this.#head.next = node;
            this.#tail = node;
            this.#tail.previous = this.#head;
            return;
        }

        const prevTail = this.#tail;
        prevTail.next = node;
        this.#tail = node;
        this.#tail.previous = prevTail;
    }

    getSum() {
        let total = 0;
        let current = this.#head;

        while (current !== null) {
            console.log(current);
            total += current.value;
            current = current.next;
        }

        return total;
    }
}

class MyNode {
    value = null;

    next = null;
    previous = null;

    constructor(value) {
        this.value = value;
    }
}

const list = new LinkedList();

const node1 = new MyNode(1);
const node2 = new MyNode(2);
const node3 = new MyNode(3);

list.add(node1);
list.add(node2);
list.add(node3);

console.log(list.getSum());
```
