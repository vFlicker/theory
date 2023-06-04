# Tree (дерево)

Дерево – це структура даних, яка відповідає ієрархічній моделі. Вона складається з вершин (вузлів) та ребер, які з'єднують ці вершини. Дерева відрізняються від графів тим, що в них відсутні цикли. Це означає, що з будь-якої вершини можна дійти до будь-якої іншої вершини, пройшовши по ребрах, але при цьому не можна повернутись до початкової вершини, утворивши цикл.

Дерева використовуються для представлення ієрархічних структур, таких як файлові системи, структури документів, ієрархії організацій та багато іншого. Вони також широко використовуються в штучному інтелекті та складних алгоритмах, де вони забезпечують ефективний механізм зберігання та обробки даних.

Дерева можуть мати корінь (початкову вершину), гілки (піддерева, що виходять з кореня) та листки (вершини без наступників). Вони також можуть бути бінарними, коли кожна вершина має не більше двох наступників, або мають більш складну структуру з багатьма наступниками.

Завдяки своїй ієрархічній природі, дерева надають можливість легко організувати, пошукати та опрацьовувати дані згідно з їхнім розташуванням у структурі, що робить їх важливим інструментом в області обробки даних.

## Методи бінарного дерева

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
        const newNode = new Node(data);

        if (!this.#root) {
            this.#root = newNode;
        } else {
            this.#addNode(this.#root, newNode);
        }
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

    #addNode(parentNode, newNode) {
        if (newNode.data < parentNode.data) {
            if (!parentNode.left) {
                parentNode.left = newNode;
            } else {
                this.#addNode(parentNode.left, newNode);
            }
        } else {
            if (!parentNode.right) {
                parentNode.right = newNode;
            } else {
                this.#addNode(parentNode.right, newNode);
            }
        }
    }
}
```
