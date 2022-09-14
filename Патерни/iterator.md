```js
class Cursor {
    constructor(data) {
        this.data = data;
    }

    skip(count) {
        return new Cursor(this.data.slice(count));
    }

    limit(count) {
        return new Cursor(this.data.slice(0, count));
    }

    count() {
        return this.data.length;
    }

    toArray() {
        return this.data;
    }
}
```
