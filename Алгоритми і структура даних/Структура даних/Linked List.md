# LinkedList (зв'язаний список)

Зв'язковий список — це структура даних з елементів, що складаються з вузлів (нод), які містять якісь дані та покажчика на наступний вузол у ланцюжку або `null`, якщо зв'язку з іншими вузлами немає. Також є покажчик на перший елемент — head.

Використовуються для реалізації файлових систем, хеш-таблиць та списків суміжності. А «під капотом» DOM-дерево зберігає вузли дерева на одному рівні вкладеності як двозв'язний список, йдеться зараз про властивості `nextSibling` і `previousSibling`.

Однозв'язний список — це приблизно те саме, що й приклад з DOM-деревом, тільки з одним зв'язком. Якби ми у прикладі зверху мали доступ тільки до наступного сусіда, а попереднього дізнатися вже не могли.

## Складність алгоритму

- Видалення та запис на початок відпрацьовує за `O(1)`
- Пошук за `O(n)`

## Переваги та недоліки

-   Виділення пам'яті — динамічний, відбувається асинхронно під час запуску (виконання)
-   Отримання елементів — пошук по всіх вузлах черги, швидкість невисока
-   Додавання/видалення елементів — у зв'язку з динамічним розподілом пам'яті швидкість висока
-   Структура — однонаправлений, двонаправлений чи циклічний

**Приклад 1**

```js
class Node {
  constructor(value, next = null) {
      this.value = value;
      this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(value) {
    const newNode = new Node(value);

    // if (this.tail) {
    //   this.tail.next = newNode;
    // }

    if (this.head === null) {
      this.head = newNode;
    } else {
      let currentNode = this.head;

      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }

      currentNode.next = newNode;
    }

    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    this.length++;
  }

  get(value) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  has(value) {
    return this.get(value) !== null;
  }

  delete(value) {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next !== null) {
      if (currentNode.next.value === value) {
        currentNode.next = currentNode.next.next;
        this.length--;
        return;
      }

      currentNode = currentNode.next;
    }
  }

  values() {
    const values = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  }
}
```
