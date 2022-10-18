## Visitor (відвідувач)

Дає змогу додавати до програми нові операції, не змінюючи класи об'єктів, над якими ці операції можуть виконуватися

**Приклад 1 (JavaScript)**

```js
class Employee {
    #name = null;
    #salary = null;
    #vacation = null;

    constructor(name, salary, vacation) {
        this.#name = name;
        this.#salary = salary;
        this.#vacation = vacation;
    }

    get name() {
        return this.#name;
    }

    get salary() {
        return this.#salary;
    }

    get vacation() {
        return this.#vacation;
    }

    set name(name) {
        this.#name = name;
    }

    set salary(salary) {
        this.#salary = salary;
    }

    set vacation(salary) {
        this.#vacation = salary;
    }

    accept(visitor) {
        visitor.visit(this);
    }
}

class ExtraSalary {
    visit(emp) {
        emp.salary = emp.salary * 1.1;
    }
}

class ExtraVacation {
    visit(emp) {
        emp.vacation = emp.vacation + 2;
    }
}

const johnEmployee = new Employee("John", 10000, 10);
const maryEmployee = new Employee("Mary", 20000, 21);
const bossEmployee = new Employee("Boss", 250000, 51);

const visitorSalary = new ExtraSalary();
const visitorVacation = new ExtraVacation();

johnEmployee.accept(visitorSalary);
maryEmployee.accept(visitorSalary);
maryEmployee.accept(visitorVacation);

const employees = [johnEmployee, maryEmployee, bossEmployee];

for (let index = 0; index < employees.length; index++) {
    const employee = employees[index];
    console.log(
        `${employee.name}: $${employee.salary} and ${employee.vacation} vacation days`
    );
}
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Інтерфейс Component оголошує метод `accept`, який має
 * приймати базовий інтерфейс відвідувача як аргумент.
 */
interface Component {
    accept(visitor: Visitor): void;
}

/**
 * Кожен конкретний компонент повинен реалізувати метод
 * `accept` таким чином, щоб він викликав метод
 * відвідувача, який відповідає класу компонента.
 */
class ConcreteComponentA implements Component {
    /**
     * Зверніть увагу, що ми викликаємо
     * `visitConcreteComponentA`, який відповідає поточному
     * імені класу. Таким чином ми повідомляємо відвідувачу
     * клас компонента, з яким він працює.
     */
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentA(this);
    }

    /**
     * Concrete Components можуть мати спеціальні методи,
     * яких не існує в їх базовому класі чи інтерфейсі.
     * Відвідувач усе ще може використовувати ці методи,
     * оскільки йому відомий конкретний клас компонента.
     */
    public exclusiveMethodOfConcreteComponentA(): string {
        return "A";
    }
}

class ConcreteComponentB implements Component {
    /**
     * Те саме тут: visitConcreteComponentB => ConcreteComponentB
     */
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentB(this);
    }

    public specialMethodOfConcreteComponentB(): string {
        return "B";
    }
}

/**
 * Інтерфейс відвідувача оголошує набір методів
 * відвідування, які відповідають класам компонентів.
 * Сигнатура методу відвідування дозволяє відвідувачу
 * визначити точний клас компонента, з яким він має справу.
 */
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;

    visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
 * Concrete Visitors реалізують кілька версій одного
 * алгоритму, який може працювати з усіма конкретними
 * класами компонентів.
 *
 * Ви можете відчути найбільшу перевагу шаблону
 * відвідувача, використовуючи його зі складною структурою
 * об'єктів, як-от складене дерево. У цьому випадку може
 * бути корисним зберігати деякий проміжний стан алгоритму
 * під час виконання методів відвідувача над різними
 * об'єктами структури.
 */
class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(
            `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
        );
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(
            `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`
        );
    }
}

class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(
            `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
        );
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(
            `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`
        );
    }
}

/**
 * Клієнтський код може виконувати операції відвідувача
 * над будь-яким набором елементів, не з'ясовуючи їхні
 * конкретні класи. Операція `accept` спрямовує виклик
 * до відповідної операції в об'єкті відвідувача.
 */
function clientCode(components: Component[], visitor: Visitor) {
    for (const component of components) {
        component.accept(visitor);
    }
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

console.log(
    "The client code works with all visitors via the base Visitor interface:"
);
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);

console.log(
    "It allows the same client code to work with different types of visitors:"
);
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
```
