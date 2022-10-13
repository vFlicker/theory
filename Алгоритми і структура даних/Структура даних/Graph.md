```js
const levels = {
    "level-0": {
        description: "Level 0 description",
        answers: {
            left: "level-0",
            jump: null,
            right: "level-1",
        },
    },

    "level-1": {
        description: "Level 1 description",
        answers: {
            left: "level-0",
            jump: "level-2",
            right: null,
        },
    },
};
```
