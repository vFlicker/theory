## Tree (дерево)

Ієрархічна структура даних, що складається з вершин (вузлів) та ребер, що з'єднують їх. Вони схожі на графи, але є одна важлива відмінність — у дереві не може бути циклу. Дерева широко використовуються у штучному інтелекті та складних алгоритмах для забезпечення ефективного механізму зберігання даних

### Методи бінарного дерева

-   add — додати вузол
-   findMin — отримати мінімальний вузол
-   findMax — отримати максимальний вузол
-   find — знайти певний вузол
-   isPresent — перевірити наявність певного вузла
-   remove — видалити вузол

```js
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    #root = null;

    add(data) {
        const node = this.#root;

        if (!node) {
            this.#root = new Node(data);
            return;
        }

        return this.#searchTree(node, data);
    }

    findMin() {
        let current = this.#root;

        while (current.left) {
            current = current.left;
        }

        return current.data;
    }

    findMax() {
        let current = this.#root;

        while (current.right) {
            current = current.right;
        }

        return current.data;
    }

    find(data) {
        let current = this.#root;

        while (data !== current.data) {
            data < current.data
                ? (current = current.left)
                : (current = current.right);

            if (!current) return null;
        }

        return current;
    }

    isPresent(data) {
        let current = this.#root;

        while (data !== current.data) {
            data < current.data
                ? (current = current.left)
                : (current = current.right);

            if (!current) return false;
        }

        return true;
    }

    remove(data) {
        this.#root = this.#removeNode(this.#root, data);
    }

    #removeNode(node, data) {
        if (!node) return null;

        if (data === node.data) {
            if (!node.left && !node.right) return null;

            if (!node.left) return node.right;

            if (!node.right) return node.left;

            let tempNode = node.right;

            while (tempNode.left) {
                tempNode = tempNode.left;
            }

            node.data = tempNode.data;
            node.right = this.#removeNode(node.right, tempNode.data);

            return node;
        }

        if (data < node.data) {
            node.left = this.#removeNode(node.left, data);
            return node;
        }

        node.right = this.#removeNode(node.right, data);
        return node;
    }

    #searchTree(node, data) {
        if (data < node.data) {
            if (!node.left) {
                node.left = new Node(data);
                return;
            }

            if (node.left) {
                return this.#searchTree(node.left, data);
            }
        }

        if (data > node.data) {
            if (!node.right) {
                node.right = new Node(data);
                return;
            }

            if (node.right) {
                return this.#searchTree(node.right, data);
            }
        }

        return null;
    }
}
```
