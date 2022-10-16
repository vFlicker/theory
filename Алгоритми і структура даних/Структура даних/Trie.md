## Trie (навантажене/префіксне дерево)

Префіксне дерево — це різновид пошукового дерева. Дані в ньому зберігаються послідовно (крок за кроком). Кожен вузол дерева — буква алфавіту, прямування по гілці призводить до формування слова. Вона також містить «булевий індикатор» для визначення того, що поточний вузол є останньою літерою. Префіксне дерево використовується переважно для пошуку слів у словнику, автодоповнення у пошукових системах, IP-маршрутизації

### Методи

-   add — додати слово до словника
-   isWord — перевірити наявність слова
-   print — повернути усі слова

```js
class Node {
    keys = new Map();
    #end = false;

    get isEnd() {
        return this.#end;
    }

    setEnd() {
        this.#end = true;
    }
}

class Trie {
    root = new Node();

    add(word, node = this.root) {
        if (!word.length) {
            node.setEnd();
            return;
        }

        const firstLetter = word[0];
        const wordWithoutFirstLetter = word.substring(1);

        if (!node.keys.has(firstLetter)) {
            node.keys.set(firstLetter, new Node());
        }

        return this.add(wordWithoutFirstLetter, node.keys.get(firstLetter));
    }

    isWord(word) {
        let node = this.root;

        while (word.length > 1) {
            const firstLetter = word[0];

            if (!node.keys.has(firstLetter)) return false;

            node = node.keys.get(firstLetter);
            word = word.substring(1);
        }

        const _isWord = node.keys.has(word) && node.keys.get(word).isEnd;
        return _isWord ? true : false;
    }

    print() {
        const words = [];

        this.#findAllWords(this.root, words);

        return words;
    }

    #findAllWords(node = this.root, words, string = "") {
        if (node.keys.size) {
            for (const letter of node.keys.keys()) {
                this.#findAllWords(
                    node.keys.get(letter),
                    words,
                    string.concat(letter)
                );
            }

            if (node.isEnd) words.push(string);
            return;
        }

        if (string.length) words.push(string);
    }
}
```
