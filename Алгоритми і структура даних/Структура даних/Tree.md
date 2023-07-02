# Tree (дерево)

Дерево — це структура даних, яка відповідає ієрархічній моделі. Вона складається з вершин (вузлів) та ребер, які з'єднують ці вершини. Дерева відрізняються від графів тим, що в них відсутні цикли. Це означає, що з будь-якої вершини можна дійти до будь-якої іншої вершини, пройшовши по ребрах, але при цьому не можна повернутись до початкової вершини, утворивши цикл.

Дерева використовуються для представлення ієрархічних структур, таких як файлові системи, структури документів, ієрархії організацій та багато іншого. Вони також широко використовуються в штучному інтелекті та складних алгоритмах, де вони забезпечують ефективний механізм зберігання та обробки даних.

Дерева можуть мати корінь (початкову вершину), гілки (піддерева, що виходять з кореня) та листки (вершини без наступників). Вони також можуть бути бінарними, коли кожна вершина має не більше двох наступників, або мають більш складну структуру з багатьма наступниками.

Завдяки своїй ієрархічній природі, дерева надають можливість легко організувати, пошукати та опрацьовувати дані згідно з їхнім розташуванням у структурі, що робить їх важливим інструментом в області обробки даних.

## Бінарне дерево пошуку

Бінарне дерево пошуку — це структура даних, в якій кожен вузол може мати не більше двох «дітей». Воно називається «пошуку» через свою особливу впорядкованість, що сприяє швидкому доступу до необхідної інформації. Ця впорядкованість гарантує, що для будь-якого вузла, його лівий нащадок і всі його нащадки зліва будуть меншими за нього, а всі праві нащадки — більшими або рівними йому.

Найчастіше ці дерева використовуються для побудови індексів баз даних.

## Складність алгоритму

-   Пошук — `O(log n)`
-   Запис — `O(log n)`

## Методи бінарного дерева

-   `getTopThree` — три найбільші значення
-   `add` — додати вузол
-   `findMin` — отримати мінімальний вузол
-   `findMax` — отримати максимальний вузол
-   `find` — знайти певний вузол
-   `isPresent` — перевірити наявність певного вузла
-   `remove` — видалити вузол
-   `getLength` — кількість вузлів

```js
class BSTNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BST {
    _root = null;
    _length = 0;

    getTopThree() {
        const length = this.getLength();
        let currentNode = this._root;

        if (currentNode === 0) return [];
        if (length === 1) return [currentNode.value];

        if (length === 2) {
            const isLeft = currentNode.left !== null;

            return isLeft
                ? [currentNode.value, currentNode.left.value]
                : [currentNode.right.value, currentNode.value];
        }

        if (length >= 3) {
            while (currentNode.right && currentNode.right.right) {
                currentNode = currentNode.right;
            }

            return [
                currentNode.right.value,
                currentNode.value,
                currentNode.left.value,
            ];
        }
    }

    getLength() {
        return this._length;
    }

    add(node) {
        this._length += 1;

        if (this._root === null) this._root = node;
        else this.#addNode(this._root, node);
    }

    findMin() {
        let current = this._root;

        while (current.left) current = current.left;
        return current.value;
    }

    findMax() {
        let current = this._root;

        while (current.right) current = current.right;
        return current.value;
    }

    find(value) {
        let current = this._root;

        while (value !== current.value) {
            value < current.value
                ? (current = current.left)
                : (current = current.right);

            if (current === null) return null;
        }

        return current;
    }

    isPresent(value) {
        let current = this._root;

        while (value !== current.value) {
            value < current.value
                ? (current = current.left)
                : (current = current.right);

            if (current === null) return false;
        }

        return true;
    }

    remove(value) {
        this._length -= 1;
        this._root = this.#removeNode(this._root, value);
    }

    #removeNode(node, value) {
        if (node === null) return null;

        if (value === node.value) {
            if (node.left === null && node.right === null) return null;
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let tempNode = node.right;
            while (tempNode.left) tempNode = tempNode.left;

            node.value = tempNode.value;
            node.right = this.#removeNode(node.right, tempNode.value);

            return node;
        }

        if (data < node.value) {
            node.left = this.#removeNode(node.left, value);
            return node;
        }

        node.right = this.#removeNode(node.right, value);
        return node;
    }

    #addNode(parentNode, newNode) {
        if (newNode.value < parentNode.value) {
            if (parentNode.left === null) parentNode.left = newNode;
            else this.#addNode(parentNode.left, newNode);
        } else {
            if (parentNode.right === null) parentNode.right = newNode;
            else this.#addNode(parentNode.right, newNode);
        }
    }
}

const tree = new BST();
tree.add(new BSTNode(1056));

tree.add(new BSTNode(932));
tree.add(new BSTNode(1432));

tree.add(new BSTNode(931));
tree.add(new BSTNode(956));
tree.add(new BSTNode(1130));
tree.add(new BSTNode(1476));

tree.add(new BSTNode(930));

console.dir(tree._root, { depth: null });
console.dir(tree.getTopThree());
```
