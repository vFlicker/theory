## Observer (спостерігач)

Спосіб зв'язати компоненти в коді так, щоб вони могли сповіщати один одного про оновлення

**Приклад 1 (JavaScript)**

```js
class Subject {
    #observers = new Set();

    subscribe(observer) {
        this.#observers.add(observer);
    }

    unsubscribe(observer) {
        this.#observers.delete(observer);
    }

    notify(action) {
        this.#observers.forEach((observer) => observer.update(action));
    }
}

class AbstractObserver {
    constructor() {
        if (new.target === AbstractObserver) {
            throw new Error("Can't instantiate Abstract, only concrete one.");
        }
    }

    update() {
        throw new Error(`Abstract method not implemented: ${this.update.name}`);
    }
}

class Text extends AbstractObserver {
    #text = "";

    update(action) {
        switch (action.type) {
            case "ADD_TEXT":
                this.#text = `${this.#text} ${action.payload}`;
                break;
            case "CLEAR_TEXT":
                this.#text = "";
                break;
            default:
                this.#text;
        }
    }

    write() {
        console.log(this.#text);
    }
}

class Counter extends AbstractObserver {
    #count = 0;

    update(action) {
        switch (action.type) {
            case "INCREMENT":
                this.#count += action.payload;
                break;
            case "DECREMENT":
                this.#count -= action.payload;
                break;
            default:
                this.#count;
        }
    }

    write() {
        console.log(this.#text);
    }
}

const subject = new Subject();

const text = new Text();
subject.subscribe(text);

const counter = new Counter();
subject.subscribe(counter);

text.write();
counter.write();

subject.notify({ type: "INCREMENT", payload: 1 });
subject.notify({ type: "ADD_TEXT", payload: "foo" });

text.write();
counter.write();
```

**Приклад 2 (React)**

```jsx
// observable.js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

export default new Observable();

// app.jsx
import React from "react";
import { Button, Switch, FormControlLabel } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import observable from "./Observable";

function handleClick() {
    observable.notify("User clicked button!");
}

function handleToggle() {
    observable.notify("User toggled switch!");
}

function logger(data) {
    console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
    toast(data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeButton: false,
        autoClose: 2000,
    });
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
    return (
        <div className="App">
            <Button variant="contained" onClick={handleClick}>
                Click me!
            </Button>
            <FormControlLabel
                control={<Switch name="" onChange={handleToggle} />}
                label="Toggle me!"
            />
            <ToastContainer />
        </div>
    );
}
```
