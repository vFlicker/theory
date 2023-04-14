# SQL

SQL (Structured Query Language / Мова Структурованих Запитів) — стандартна мова запитів до реляційних баз даних. Вона використовується для створення, модифікації та запитів даних з таблиць баз даних.

## Операції з даними

### Створення бази даних та таблиці

Створення бази даних або таблиці.
Відбувається за допомогою ключового слова: `CREATE`.

Ключові слова

-   `INDEX` — для створення індексу для підвищення швидкодії виконання запитів на великих таблицях
-   `PRIMARY KEY` — для визначення первинного ключа таблиці, який унікально ідентифікує кожен рядок таблиці
-   `CHECK` — для встановлення умови, яку повинні задовольняти дані, що вставляються в таблицю
-   `UNIQUE` — для встановлення обмеження на унікальність значень у стовпці таблиці
-   `DEFAULT` — для встановлення значення за замовчуванням для стовпця таблиці.
-   `NOT NULL` — для встановлення обов'язковості заповнення стовпця таблиці.

```sql
CREATE DATABASE application_data;

CREATE TABLE IF NOT EXISTS Employee (
    EmployeeId serial PRIMARY KEY,
    FirstName varchar(255) INDEX NOT NULL,
    Email text UNIQUE,
    EmployeePassword varchar(64) NOT NULL,
    Price numeric CHECK (Price > 0)
    Salary numeric DEFAULT 600,
);
```

### Видалення бази даних та таблиці

Видалення бази даних або таблиці якщо вона більше не потрібна.
Відбувається за допомогою ключового слова: `DROP`.

```sql
DROP DATABASE [IF EXISTS] application_data;

DROP TABLE [IF EXISTS] Employee;
```

### Зміна структури таблиці

Зміна структуру таблиці, додавання нових полів або видалення існуючих.
Відбувається за допомогою ключового слова: `ALTER`.

```sql
ALTER TABLE Employee
ADD COLUMN DataOfBirth date;
```

### Індексація

Дозволяє швидко знаходити записи у таблиці за певними полями.
Відбувається за допомогою ключового слова: `INDEX`.

```sql
CREATE TABLE Product(
  ProductId integer,
  ProductName text UNIQUE INDEX
);

ALTER TABLE Product ADD CONSTRAINT pkProduct PRIMARY KEY (Id);

CREATE INDEX ON Employee (LastName);

CREATE UNIQUE INDEX akProductProductName ON Product (ProductName);

/* Індекси для зв'язку багато до багатьох */
CREATE TABLE GroupUser (
    GroupId integer NOT NULL,
    UserId integer NOT NULL
);

ALTER TABLE GroupUser ADD CONSTRAINT pkGroupUser PRIMARY KEY (GroupId, UserId);

ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserGroupId FOREIGN KEY (GroupId)
REFERENCES SystemGroup (Id) ON DELETE CASCADE;

ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserUserId FOREIGN KEY (UserId)
REFERENCES SystemUser (Id) ON DELETE CASCADE;
```

### Пошук

Знаходження записів, які відповідають певному критерію в таблицях.
Відбувається за допомогою ключових слів: `SELECT`, `WHERE`, `GROUP BY`, `HAVING` і `ORDER BY`.

```

SELECT [ALL | DISTINCT] column1[, column2]...
FROM table1[, table2]...
[WHERE <conditions>]
[GROUP BY <conditions>]
[HAVING <conditions>]
[ORDER BY <conditions> [ASC | DESC]]

```

Оператор `SELECT DISTINCT` використовується для вибірки унікальних значень з вказаного стовпця або стовпців в таблиці РБД. Він повертає лише унікальні (не повторюються) значення з вказаних стовпців і виключає дублікати з результатів запиту.

```sql
SELECT DISTINCT name FROM users;
```

### Фільтрація

Відбір записів, що відповідають певному критерію, та вилучення інших записів.
Відбувається за допомогою ключового слова `WHERE`.

Оператори умов у SQL

-   `=` — чи є значення стовпця рівним вказаному значенню
-   `>` — чи є значення стовпця більшим за вказане значення
-   `<` — чи є значення стовпця меншим за вказане значення
-   `>`= — чи є значення стовпця більшим або рівним вказаному значенню
-   `<=` — чи є значення стовпця меншим або рівним вказаному значенню
-   `!=` або `<>` — чи не є значення стовпця рівним вказаному значенню
-   `LIKE` — використовується для відбору даних, які відповідають вказаному шаблону. Шаблон може містити спеціальні символи % (довільна послідовність символів) та \_ (один будь-який символ)
-   `IN` — використовується для відбору даних, які мають значення, що входять до переліку вказаних значень
-   `IS NULL` — використовується для відбору даних, які мають значення NULL
-   `BETWEEN` — використовується для відбору даних, які мають значення, що знаходяться в діапазоні між двома вказаними значеннями
-   `AND` — використовується для комбінування двох або більше умов. Він повертає результат тільки тоді, коли обидві умови є істинними

```sql
SELECT Id, UserName, Title, Salary FROM Info
WHERE Title = 'Sales' OR (Title = 'Programmer' AND Salary >= 45000);

/* Цей SQL запит робить те саме... */
SELECT Id, DepartmentName, Salary FROM Employee
WHERE DepartmentName IN ('Software', 'QA');

/* ...що і цей */
SELECT Id, DepartmentName, Salary FROM Employee
WHERE DepartmentName = 'Software' OR DepartmentName = 'QA';

/* Цей SQL запит робить те саме... */
SELECT Id, Age, LastName FROM Employee
WHERE Age BETWEEN 30 AND 40;

/* ...що і цей */
SELECT Id, Age, LastName FROM Employee
WHERE Age >= 30 AND Age <= 40;
```

### Агрегація

Обчислення статистичних даних, таких як середнє арифметичне, максимальне або мінімальне значення, за певними полями таблиці.
Відбувається за допомогою ключових слів: `SUM`, `COUNT`, `AVG`, `MAX` та `MIN`.

```sql
SELECT avg(Salary) FROM Employee;
SELECT count(*) FROM Employee;
```

### Групування

Групування даних в таблиці за допомогою ключових слів GROUP BY і HAVING.
Відбувається за допомогою ключових слів: `GROUP BY` і `HAVING`.

The HAVING дозволяє фільтрувати результати запиту на основі підсумкових функцій, таких як `SUM`, `COUNT`, `AVG` тощо.

```sql
SELECT DepartmentName, max(Salary) FROM Employee
GROUP BY Department;

SELECT DepartmentName, max(Salary) FROM Employee
GROUP BY Department HAVING avg(Salary) > 200;
```

### Сортування

Розташування записів у таблиці відповідно до певного порядку, наприклад, алфавітному чи за зростанням чисел.
Відбувається за допомогою ключового слова: `ORDER BY`.

```sql
SELECT Id, DepartmentName, UserName, Salary FROM Info
WHERE DepartmentName = 'Sales' ORDER BY Salary;

SELECT Id, DepartmentName, UserName, Salary, Age FROM Info
WHERE DepartmentName = 'Sales' ORDER BY Salary, Age DESC;
```

### Вставка

Додавання нових даних до таблиці.
Відбувається за допомогою ключового слова `INSERT`.

```sql
INSERT INTO Product (ProductId, ProductName)
VALUES (1, 'Ноутбук'),
       (2, 'Смартфон'),
       (3, 'Планшет');
```

### Оновлення

Оновлення даних зміна або оновлення вже існуючих даних в таблиці.
Відбувається за допомогою ключового слова `UPDATE`.

```sql
UPDATE Product SET Price = 15000
WHERE ProductId = 1;
```

### Видалення

Видалення даних з таблиці.
Відбувається за допомогою ключового слова `DELETE`.

```sql
DELETE FROM Product
WHERE ProductId = 2;
```

### З'єднання

Об'єднання даних з двох або більше таблиць за певними критеріями, наприклад, по спільному стовпцю.
Відбувається за допомогою ключових слів: `JOIN`, `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN` і `FULL JOIN`.

```sql
SELECT comments.id, email, content FROM comments
JOIN users
ON comments.user_id = user.id
```
