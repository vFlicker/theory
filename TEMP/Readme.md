# ООП (об'єктно-орієнтоване програмування)

Методологія програмування, заснована на представленні програм у вигляді совокупності взаємодіючих об'єктів, кожен з яких є екземпляром визначеного класу, а класи формують ієрархію спадкування

## Принципи ООП

-   Інкапсуляція — це контроль доступу до полів та методів об'єкта. Під контролем доступу мається на увазі не тільки можна/неможливо, але й різні валідації, підвантаження, обчислення та інша динамічна поведінка
-   Наслідування — один із способів використовувати методи та властивості одних об'єктів (батьків) в інших об'єктах (нащадках)
-   Поліморфізм (безліч форм) — властивість системи, що дозволяє мати безліч реалізацій одного інтерфейсу. Можливість використовувати один ідентифікатор (ім'я) для вирішення схожих, але різних, з погляду реалізації завдань

## Інкапсуляція

Частиною інкапсуляції є приховування даних. Для цього існують модифікатори доступу

-   public (публічний) — до атрибуту може отримати доступ будь-хто
-   private (приватний) — до атрибуту можуть звертатися лише методи цього класу
-   protected (захищений) — те ж, що і private, тільки доступ отримують і спадкоємці класу, в тому числі

## Наслідування

-   Не варто створювати занадто довгі ланцюжки прототипів
-   Батьківські класи повинні бути максимально абстрактними (проблема банана і джунглі)
-   При неправильному виділенні абстракцій може виникнути проблема множинного наслідування, яке працює не на всіх мовах

### Альтернативи наслідування

-   Композиції
-   Делегування
-   Mixins
-   Інтерфейси

### Наслідування чи Композиція

Як при описі відносин двох сутностей визначити, коли доречне наслідування, а коли композиція? Можна скористатися популярною шпаргалкою: запитайте себе, сутність А є сутністю Б? Якщо так, то, швидше за все, тут підійде наслідування. Якщо ж сутність А є частиною сутності Б, наш вибір — композиція

1. Автобот є Трансформером? Так, вибираємо наслідування
2. Гармата є частиною трансформатора? Так, отже, композиція

## Поліморфізм

Користь поліморфізму в даному прикладі полягає в тому, що код гри нічого не знає про реалізацію його прохання, хто як повинен грати, його завдання просто викликати метод `play`, сигнатура якого однакова для всіх класів гітаристів. Це дозволяє додавати нові класи гітаристів або змінювати методи існуючих, не змінюючи код гри

### Без поліморфізму

-   Проблема з неймінгом (уявимо 100 різних гітаристів)
-   Як змусити грати всіх музикантів?
-   Ускладнюється супровід коду