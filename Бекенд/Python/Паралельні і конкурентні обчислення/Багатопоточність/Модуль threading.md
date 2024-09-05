# Модуль `threading`

Модуль `threading` у Python дозволяє створювати багатопотокові програми. Хоча через GIL одночасно може виконуватися лише один потік, `threading` все одно може бути корисним для I/O-bound задач, таких як мережеві запити або операції з файлами.

## Основні концепції

-   Потік (Thread): Окремий шлях виконання програми. Кожен потік має свій стек виконання, і програма може містити кілька потоків, що виконуються паралельно.
-   Багатопотоковість: Здатність програми виконувати кілька потоків одночасно.
-   Синхронізація: Координація виконання потоків для уникнення проблем з доступом до спільних ресурсів.

## Основні методи `threading.Thread`

-   `start()` — запускає виконання потоку.
-   `join()` — блокує основний потік, доки дочірній потік не завершиться.
-   `is_alive()` — повертає, чи потік ще виконується.
-   `daemon` — дозволяє зробити потік «фоновим» (demon thread), який автоматично завершиться, коли завершиться основний потік.

## Створення потоків

```py
import threading
import time

def print_numbers():
    for i in range(1, 6):
        print(i)
        time.sleep(1)  # Симуляція затримки

# Створюємо потік
thread = threading.Thread(target=print_numbers)

# Запускаємо потік
thread.start()

# Чекаємо завершення потоку
thread.join()
print("Потік завершено")
```

### Використання класів для потоків

Окрім запуску функцій у потоках, можна створювати класи, що наслідують клас Thread, для більш гнучкого управління потоками.

```py
import threading

class MyThread(threading.Thread):
    def run(self):
        for i in range(5):
            print(f"Потік {self.name} виконується: {i}")

# Створення та запуск двох потоків
thread1 = MyThread()
thread2 = MyThread()

thread1.start()
thread2.start()

thread1.join()
thread2.join()
```

## М'ютекси та блокування (Locks)

Під час роботи з багатопоточними програмами важливо уникати «гонки потоків» (race conditions) — ситуації, коли кілька потоків одночасно звертаються до одних і тих самих ресурсів (наприклад, змінних) і змінюють їх. Для цього використовують м'ютекси (mutexes) або блокування (locks).

### Приклад використання Lock

У цьому прикладі блокування запобігає одночасному доступу кількох потоків до змінної `balance`, що дозволяє уникнути некоректних результатів.

```py
import threading

balance = 0
lock = threading.Lock()

def deposit(amount):
    global balance
    with lock:
        balance += amount

threads = []
for _ in range(10):
    thread = threading.Thread(target=deposit, args=(100,))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.start()

for thread in threads:
    thread.join()

print(f"Загальний баланс: {balance}")
```

### RLock (Reentrant Lock)

RLock (реентрабельний замок) — це тип блокування, який дозволяє одному і тому ж потоку отримати блокування кілька разів.

```py
import threading

rlock = threading.RLock()

def recursive_function(n):
    with rlock:
        if n > 0:
            print(f"Recursion level {n}")
            recursive_function(n - 1)

# Створюємо і запускаємо потік
thread = threading.Thread(target=recursive_function, args=(5,))
thread.start()
thread.join()
```

## Умовні змінні (Condition)

`Condition` дозволяє потокам чекати на певні умови перед продовженням роботи. Це корисно для координації роботи між потоками.

```py
import threading

condition = threading.Condition()
data_ready = False

def producer():
    global data_ready
    with condition:
        data_ready = True
        condition.notify()  # Повідомляємо, що дані готові

def consumer():
    with condition:
        condition.wait()  # Чекаємо на повідомлення
        if data_ready:
            print("Data is ready!")

# Створюємо і запускаємо потоки
producer_thread = threading.Thread(target=producer)
consumer_thread = threading.Thread(target=consumer)

consumer_thread.start()
producer_thread.start()

producer_thread.join()
consumer_thread.join()
```

## Демонічні потоки (Daemon Threads)

У цьому прикладі потік `background_task` працює у фоновому режимі, доки не завершиться основна програма.

```py
import threading
import time

def background_task():
    while True:
        print("Фонове завдання виконується...")
        time.sleep(2)

# Створюємо демонічний потік
daemon_thread = threading.Thread(target=background_task)
daemon_thread.daemon = True
daemon_thread.start()

time.sleep(5)
print("Основна програма завершена")
```

## Паралельне завантаження файлів

```py
import threading
import requests
import time

def download_file(url):
    response = requests.get(url)
    filename = url.split("/")[-1]
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"Завантажено {filename}")

urls = [
    "http://example.com/file1.txt",
    "http://example.com/file2.txt",
    "http://example.com/file3.txt"
]

threads = []
start_time = time.time()

for url in urls:
    thread = threading.Thread(target=download_file, args=(url,))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

end_time = time.time()
print(f"Всі файли завантажено за {end_time - start_time:.2f} секунд")
```
