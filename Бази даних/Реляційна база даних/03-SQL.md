# SQL

SQL (Structured Query Language / Мова Структурованих Запитів) є стандартною мовою для роботи з реляційними базами даних. Вона дозволяє створювати, модифікувати і взаємодіяти з даними у таблицях баз даних.

## Ключові слова SQL

- `INDEX` — використовується для створення індексу для підвищення швидкодії запитів на великих таблицях.
- `PRIMARY KEY` — визначає первинний ключ таблиці, який унікально ідентифікує кожний рядок.
- `CHECK` — встановлює умову, яку повинні відповідати дані, що вставляються в таблицю.
- `UNIQUE` — обмежує унікальність значень у стовпці таблиці.
- `DEFAULT` — встановлює значення за замовчуванням для стовпця таблиці.
- `NOT NULL` — встановлює обов'язковість заповнення стовпця таблиці.

## Оператори умов SQL

SQL використовує оператори умов для фільтрації даних та встановлення критеріїв пошуку.

- `=` — рівність.
- `>` — більше.
- `<` — менше.
- `>`= — більше або рівне.
- `<=` — менше або рівне.
- `!=` або `<>` — не рівне.
- `LIKE` — для роботи з текстовими даними та шаблонами.
- `AND` — для поєднання умов.
- `IN` — для перевірки належності значення до списку.
- `IS NULL` — для перевірки на відсутність значення.
- `BETWEEN` — для перевірки значення в діапазоні.

## Операції з Даними в SQL

### Створення бази даних та таблиці

SQL дозволяє створювати бази даних та таблиці в цих базах даних. Ми також можемо визначити структуру таблиць, включаючи їхні поля та обмеження.

```sql
-- Створення бази даних та таблиці.
CREATE DATABASE mydatabase;

CREATE TABLE
    users (
        id INT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE,
        birthdate DATE
    );
```

### Видалення бази даних та таблиці

SQL дозволяє видаляти бази даних та таблиці, які більше не потрібні.

```sql
-- Видалення бази даних та таблиці.
DROP DATABASE mydatabase;

DROP TABLE users;
```

### Зміна структури таблиці

Ми можемо змінювати структуру таблиці, додавати нові стовпці, видаляти існуючі стовпці або змінювати їхні типи даних.

```sql
-- Додавання нового стовпця до таблиці.
ALTER TABLE users
ADD COLUMN profile_image VARCHAR(255);
```

### Пошук

SQL дозволяє виконувати запити для вибору даних з таблиць. Запити можуть бути виконані з використанням команди `SELECT`, яка дозволяє вибирати дані з одного або більше стовпців та таблиць за певними критеріями.

```sql
-- Вибір всіх користувачів з таблиці.
SELECT
    *
FROM
    users;
```

### Фільтрація та сортування даних

SQL дозволяє фільтрувати дані на основі певних умов за допомогою ключового слова `WHERE`. Також можна сортувати результати запиту за певними стовпцями за допомогою ключового слова `ORDER BY`.

```sql
-- Фільтрація користувачів за умовою та сортування за ім'ям.
SELECT
    *
FROM
    users
WHERE
    age > 30
ORDER BY
    username;
```

### Агрегація даних

SQL дозволяє виконувати агрегатні функції, такі як `COUNT`, `DISTINCT`, `SUM`, `AVG`, `MAX` та `MIN`, для отримання підсумкової інформації.

```sql
-- Обчислення середнього віку користувачів.
SELECT
    AVG(age)
FROM
    users;

-- Вибір унікальних імен користувачів з таблиці.
SELECT DISTINCT
    name
FROM
    users;
```

### Групування даних

Ми можемо групувати дані в таблиці за допомогою ключових слів `GROUP BY` і `HAVING`. Оператор `HAVING` дозволяє фільтрувати результати на основі агрегатних функцій, таких як `SUM`, `COUNT`, `AVG` тощо.

```sql
-- Групування за відділами та визначення максимальної зарплати.
SELECT
    DepartmentName,
    MAX(Salary)
FROM
    Employee
GROUP BY
    Department;

-- Групування за відділами та фільтрація за середньою зарплатою понад 200.
SELECT
    DepartmentName,
    MAX(Salary)
FROM
    Employee
GROUP BY
    Department
HAVING
    AVG(Salary) > 200;
```

### З'єднання таблиць

SQL дозволяє об'єднувати дані з двох або більше таблиць за допомогою ключових слів `JOIN`, `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN` і `FULL JOIN`. Це корисно для отримання даних, які зберігаються в різних таблицях.

```sql
-- Використання INNER JOIN для об'єднання двох таблиць.
SELECT
    orders.order_id,
    customers.customer_name
FROM
    orders
    INNER JOIN customers ON orders.customer_id = customers.customer_id;
```

### Вставка, оновлення та видалення даних

SQL дозволяє додавати нові дані до таблиць за допомогою команди `INSERT`, оновлювати існуючі дані за допомогою команди `UPDATE` і видаляти дані за допомогою команди `DELETE`.

```sql
-- Вставки нового користувача в таблицю.
INSERT INTO
    users ( username, email, age)
VALUES
    ('john_doe', 'john@example.com', 25);
```

```sql
-- Оновлення даних користувача:
UPDATE users
SET
    age = 26
WHERE
    username = 'john_doe';
```

```sql
-- Видалення користувача з таблиці:
DELETE FROM users
WHERE
    username = 'john_doe';
```

### Індексація

Індекси дозволяють швидко знаходити записи в таблицях за певними полями і покращують продуктивність запитів.

```sql
-- Створення таблиці з індексом на унікальне поле ProductName.
CREATE TABLE
    Product (ProductId INTEGER, ProductName TEXT UNIQUE INDEX);

-- Додавання первинного ключа (Primary Key) до таблиці Product.
ALTER TABLE Product ADD CONSTRAINT pkProduct PRIMARY KEY (Id);

-- Створення індексу на полі LastName таблиці Employee.
CREATE INDEX ON Employee (LastName);

-- Створення унікального індексу для поля ProductName таблиці Product.
CREATE UNIQUE INDEX akProductProductName ON Product (ProductName);

-- Створення таблиці для зв'язку багато-до-багатьох з двома індексами.
CREATE TABLE
    GroupUser (GroupId INTEGER NOT NULL, UserId INTEGER NOT NULL);

-- Додавання складеного первинного ключа до таблиці GroupUser.
ALTER TABLE GroupUser ADD CONSTRAINT pkGroupUser PRIMARY KEY (GroupId, UserId);

-- Додавання зовнішнього ключа (Foreign Key) до поля GroupId.
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserGroupId FOREIGN KEY (GroupId) REFERENCES SystemGroup (Id) ON DELETE CASCADE;

-- Додавання зовнішнього ключа (Foreign Key) до поля UserId.
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserUserId FOREIGN KEY (UserId) REFERENCES SystemUser (Id) ON DELETE CASCADE;
```
