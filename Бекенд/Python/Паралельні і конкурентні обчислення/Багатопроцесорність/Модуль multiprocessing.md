# Модуль `multiprocessing`

`multiprocessing` — це модуль у Python, який дозволяє створювати окремі процеси для виконання задач паралельно. На відміну від потоків, кожен процес має власну пам'ять і власний інтерпретатор Python, що дозволяє обійти обмеження GIL. Це робить модуль корисним для CPU-bound задач, де важливо використовувати всі ядра процесора.

## Основні концепції

-   Процес — це незалежний екземпляр програми, який може виконуватися паралельно з іншими процесами. У кожного процесу свій адресний простір пам'яті, що робить його більш «ізольованим» порівняно з потоками.
-   GIL не діє на рівні процесів, тому `multiprocessing` дозволяє виконувати Python-код паралельно на багатьох ядрах процесора.

## Створення процесів

Для створення нового процесу використовується клас `Process` з модуля `multiprocessing`. Кожен процес виконує функцію або метод у паралельному потоці виконання.

```py
import multiprocessing

def worker():
    print("Виконую роботу в окремому процесі")

if __name__ == "__main__":
    process = multiprocessing.Process(target=worker)
    process.start()  # Запуск процесу
    process.join()   # Очікування завершення процесу
```

**Важливість** `__name__ == "__main__"`

У Windows кожен новий процес перезапускає скрипт, тому важливо перевіряти, що код створення процесу виконується лише в основному процесі. Це необхідно, щоб уникнути рекурсивного створення процесів.

## Пули процесів (Process Pools)

Пули процесів дозволяють керувати кількома процесами одночасно і автоматично розподіляти задачі між ними. Це особливо корисно для завдань, що можуть бути розподілені на кілька частин.

```py
import multiprocessing

def square(n):
    return n * n

if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5]
    pool = multiprocessing.Pool(processes=4)  # Створюємо пул з 4 процесів
    results = pool.map(square, numbers)
    print(results)
```

У цьому прикладі функція `square` буде виконуватися у паралельних процесах для кожного елемента списку numbers.

## Взаємодія між процесами

Оскільки процеси мають окремий адресний простір, прямий доступ до змінних іншого процесу неможливий. Для обміну даними між процесами використовуються такі механізми як черги та менеджери.

### Черги (Queues)

Черги дозволяють передавати дані між процесами. Вони є потокобезпечними і можуть використовуватися для передачі результатів від одного процесу до іншого.

```py
import multiprocessing

def worker(queue):
    queue.put("Дані від процесу")

if __name__ == "__main__":
    queue = multiprocessing.Queue()
    process = multiprocessing.Process(target=worker, args=(queue,))
    process.start()
    process.join()
    print(queue.get())  # Отримуємо дані з черги
```

### Менеджери (Managers)

Менеджери дозволяють створювати об'єкти, якими можна обмінюватися між процесами, наприклад списки, словники або черги.

```py
from multiprocessing import Manager, Process

def worker(shared_list):
    shared_list.append("Дані від процесу")

if __name__ == "__main__":
    with Manager() as manager:
        shared_list = manager.list()  # Створюємо спільний список
        process = Process(target=worker, args=(shared_list,))
        process.start()
        process.join()
        print(shared_list)  # Виводимо дані, додані процесом
```

## Блокування та синхронізація

У багатопроцесорних програмах важливо контролювати доступ до спільних ресурсів, щоб уникнути конфліктів. Для цього використовуються блокування (Locks).

### Приклад використання Lock

У цьому прикладі використовується Lock для синхронізації доступу до змінної `balance`, яка спільна для всіх процесів.

```py
import multiprocessing

def worker(shared_list, lock):
    with lock:
        shared_list.append(1)

if __name__ == "__main__":
    with multiprocessing.Manager() as manager:
        shared_list = manager.list()  # Створюємо спільний список
        lock = multiprocessing.Lock()  # Створюємо блокування для синхронізації доступу
        processes = []
        for _ in range(10):
            process = multiprocessing.Process(target=worker, args=(shared_list, lock))
            processes.append(process)
            
        for process in processes:
            process.start()

        for process in processes:
            process.join()

        print(shared_list)
```
