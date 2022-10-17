## Composite (компонувальник/дерево)

Дає змогу згрупувати декілька об'єктів у деревоподібну структуру, а потім працювати з нею так, ніби це одиничний об'єкт

**Приклад 1 (JavaScript)**

```js
/**
 * Рекурсивно обходить (під)дерево
 */
const traverse = (node, indent = 1) => {
    console.log(Array(indent).join("--") + node.name);

    for (let index = 0; index < node.children.length; index++) {
        const newIndent = indent + 1;
        traverse(node.getChild(index), newIndent);
    }
};

class Node {
    name = null;
    children = [];

    constructor(name) {
        this.name = name;
    }

    add(child) {
        this.children.push(child);
    }

    remove(child) {
        for (let index = 0; index < this.children.length; index++) {
            const currentChild = this.children[index];

            if (child === currentChild) {
                this.children.splice(index, 1);
                return;
            }
        }
    }

    getChild(index) {
        return this.children[index];
    }

    hasChildren() {
        return this.children.length > 0;
    }
}
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Базовий клас Component оголошує загальні операції
 * для простих і складних об'єктів композиції.
 */
abstract class Component {
    protected parent!: Component | null;

    /**
     * За бажанням базовий компонент може оголосити
     * інтерфейс для встановлення та доступу
     * до батьківського компонента в структурі дерева.
     * Він також може забезпечити реалізацію
     * за замовчуванням для цих методів.
     */
    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    /**
     * У деяких випадках було б корисно визначити операції
     * керування дочірніми елементами безпосередньо
     * в базовому класі компонентів. Таким чином,
     * вам не потрібно буде надавати клієнтському коду
     * будь-які конкретні класи компонентів, навіть під час
     * збирання дерева об'єктів. Недоліком є те,
     * що ці методи будуть порожніми для компонентів
     * листового рівня.
     */
    public add(component: Component): void {}

    public remove(component: Component): void {}

    /**
     * Ви можете надати метод, який дозволяє клієнтському
     * коду визначити, чи може компонент мати дітей.
     */
    public isComposite(): boolean {
        return false;
    }

    /**
     * Базовий компонент може реалізувати певну поведінку
     * за замовчуванням або залишити це конкретним класам
     * (оголосивши метод, що містить поведінку,
     * як «абстрактний»).
     */
    public abstract operation(): string;
}

/**
 * Клас Leaf представляє кінцеві об'єкти композиції.
 * Листок не може мати дітей.
 *
 * Зазвичай об'єкти Leaf виконують фактичну роботу, тоді як
 * Composite об'єкти лише делегують своїм підкомпонентам.
 */
class Leaf extends Component {
    public operation(): string {
        return "Leaf";
    }
}

/**
 * Клас Composite представляє складні компоненти,
 * які можуть мати дітей. Зазвичай складені об'єкти
 * делегують фактичну роботу своїм нащадкам,
 * а потім «підводять» результат.
 */
class Composite extends Component {
    protected children: Component[] = [];

    /**
     * Складений об'єкт може додавати або видаляти інші
     * компоненти (як прості, так і складні) до чи зі свого
     * дочірнього списку.
     */
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    /**
     * Composite виконує свою первинну логіку певним чином.
     * Він рекурсивно проходить усіх своїх дітей, збираючи
     * та підсумовуючи їхні результати. Оскільки нащадки
     * композиту передають ці виклики своїм нащадкам
     * і так далі, в результаті обходиться все дерево
     * об'єктів.
     */
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }

        return `Branch(${results.join("+")})`;
    }
}

/**
 * Клієнтський код працює з усіма компонентами
 * через базовий інтерфейс.
 */
function clientCode(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
}

/**
 * Таким чином клієнтський код може підтримувати прості
 * листові компоненти...
 */
const simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);

/**
 * ...а також складні композити.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);

/**
 * Завдяки тому, що операції управління дочірніми
 * елементами оголошені в базовому класі Component,
 * клієнтський код може працювати з будь-яким компонентом,
 * простим або складним, незалежно від їх конкретних
 * класів.
 */
function clientCode2(component1: Component, component2: Component) {
    if (component1.isComposite()) {
        component1.add(component2);
    }

    console.log(`RESULT: ${component1.operation()}`);
}

console.log(
    "Client: I don't need to check the components classes even when managing the tree:"
);
clientCode2(tree, simple);
```
