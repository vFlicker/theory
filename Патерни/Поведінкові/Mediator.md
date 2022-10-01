## Mediator (посередник)

Спрощує комунікацію між компонентами системи

**Приклад 1 (JavaScript)**

```js
class User {
    constructor(name, chatroom) {
        this.name = name;
        this.chatroom = chatroom;
    }

    send(message, to) {
        this.chatroom.send(message, this, to);
    }

    receive(message, from) {
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
}

class Chatroom {
    #users = {};

    register(user) {
        this.#users[user.name] = user;
    }

    send(message, from, to) {
        if (to) {
            // single message
            to.receive(message, from);
        } else {
            // broadcast message
            for (const name of Object.keys(this.#users)) {
                if (this.#users[name] !== from) {
                    this.#users[name].receive(message, from);
                }
            }
        }
    }
}

const chatroom = new Chatroom();

const yoko = new User("Yoko", chatroom);
const john = new User("John", chatroom);
const paul = new User("Paul", chatroom);
const ringo = new User("Ringo", chatroom);

chatroom.register(yoko);
chatroom.register(john);
chatroom.register(paul);
chatroom.register(ringo);

yoko.send("All you need is love.");
yoko.send("I love you John.");
john.send("Hey, no need to broadcast", yoko);
paul.send("Ha, I heard that!");
ringo.send("Paul, what do you think?", paul);
```

**Приклад 2 (TypeScript)**

```ts
/**
 * Інтерфейс посередника оголошує метод, який
 * використовується компонентами для сповіщення посередника
 * про різні події. Посередник може реагувати на ці події
 * і передавати виконання іншим компонентам.
 */
interface Mediator {
    notify(sender: object, event: string): void;
}

/**
 * Конкретний посередник. Усі зв'язки між конкретними
 * компонентами переїхали до коду посередника. Він отримує
 * повідомлення від своїх компонентів та знає, як на них
 * реагувати.
 */
class AuthenticationDialog implements Mediator {
    private textbox: Textbox;
    private button: Button;

    constructor(textbox: Textbox, button: Button) {
        this.textbox = textbox;
        this.textbox.setMediator(this);
        this.button = button;
        this.button.setMediator(this);
    }

    /**
     *  Коли щось трапляється з компонентом, він надсилає
     * посереднику повідомлення. Після отримання повідомлення
     * посередник може або зробити щось самостійно, або
     * перенаправити запит іншому компонентові.
     */
    public notify(sender: object, event: string): void {
        if (event === "Textbox do something") {
            console.log(
                "Посередник реагує на 'Textbox do something' і запускає такі операції:"
            );
            this.button.doSomething();
        }

        if (event === "Button do something") {
            console.log(
                "Посередник реагує на 'Button do something else' і запускає такі операції:"
            );
            this.textbox.doSomethingElse();
            this.button.doSomething();
        }
    }
}

/**
 * Класи компонентів спілкуються з посередниками через їх
 * загальний інтерфейс. Завдяки цьому, одні й ті ж компоненти
 * можна використовувати в різних посередниках.
 */
class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
        this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

/**
 * Конкретні компоненти жодним чином не пов'язані між собою. У
 * них є тільки один канал спілкування — через надсилання
 * повідомлень посереднику.
 */
class Textbox extends BaseComponent {
    public doSomething(): void {
        console.log("Textbox does something.");
        this.mediator.notify(this, "Textbox do something");
    }

    public doSomethingElse(): void {
        console.log("Textbox does something else.");
        this.mediator.notify(this, "Textbox do something else");
    }
}

class Button extends BaseComponent {
    public doSomething(): void {
        console.log("Button does something.");
        this.mediator.notify(this, "Button do something");
    }

    public doSomethingElse(): void {
        console.log("Button does something else.");
        this.mediator.notify(this, "Button do something else");
    }
}

/**
 * Код клієнта.
 */
const textbox = new Textbox();
const button = new Button();
const mediator = new ConcreteMediator(textbox, button);

console.log("Client triggers operation 'Textbox do something'.");
textbox.doSomething();

console.log("Client triggers operation 'Button do something else'.");
button.doSomethingElse();
```
