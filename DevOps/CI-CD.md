# CI/CD

CI/CD — це одна з ключових практик DevOps, яка об'єднує набір найкращих практик у розробці програмного забезпечення. Вона визначає, як код розробляється командами людей та як цей код подається користувачам застосунку. CI/CD допомагає розробникам розгортати зміни ПЗ швидше та надійніше, мінімізуючи помилки та підвищуючи якість продукту. Ця практика складається з двох основних етапів:

- CI (Continuous Integration) — безперервна інтеграція.
- CD (Continuous Delivery) — безперервне доставлення.

## Безперервна інтеграція (CI)

Безперервна інтеграція — це процес постійного розроблення програмного забезпечення з інтеграцією з основною гілкою репозиторію. Вона передбачає автоматичну збірку програми, проведення автоматизованих тестів та інформування команди про будь-які помилки.

## Безперервне доставлення (CD)

Безперервне доставлення — це процес постійної доставки програмного забезпечення до користувачів. Вона дозволяє розробляти проект малими ітераціями та гарантує, що програма може бути віддана у реліз в будь-який момент без додаткових ручних перевірок.

## Цикл CI/CD

1. Розробка та тестування — розробник пише код, проводить початкове тестування для виявлення помилок та фіксує зміни у своїй робочій гілці. Після цього зміни об'єднуються з основною гілкою.
2. Автоматична збірка та тестування — система CI виявляє зміни в коді та автоматично запускає збірку і автоматизоване тестування програми.
3. Ручне тестування — якщо автоматичне тестування пройшло успішно, програмне забезпечення передається команді тестувальників для ручного тестування.
4. Автоматизована доставка — після виправлення помилок, виявлених під час ручного тестування, програмне забезпечення автоматично розгортатиметься на серверах компанії.
5. Моніторинг та підтримка — нова версія програми отримує підтримку та моніторинг.
6. Виправлення помилок та покращення — запити на виправлення недоліків та багів збираються, розробник вносить зміни в код, і процес повторюється.

## Важливість CI/CD

CI/CD допомагає вирішувати численні важливі проблеми:

- Відсіювання помилок — допомагає відсіяти певний відсоток помилок на шляху до продакшну.
- Покращення якості коду — сприяє підвищенню якості коду завдяки автоматизованому тестуванню.
- Об'єднання розробки та операцій — зменшує розрив між розробкою та операційними процесами.
- Швидкість впровадження нового функціоналу — вона дозволяє розгортати нові функції швидше та ефективніше.
- Швидке виправлення помилок — дозволяє швидко виявляти та виправляти баги у програмному забезпеченні.

## Популярність CI/CD

CI/CD стає все більш популярним серед розробників програмного забезпечення з наступних причин:

- Робота над різними функціями — коли різні члени команди працюють над різними функціями, CI допомагає вирішувати конфлікти при їх об'єднанні.
- Виявлення помилок — модульні тести виконуються під час кожного об'єднання, дозволяючи швидко виявити частину коду, що спричиняє проблему.
- Часті випуски — регулярні випуски нових версій дозволяють швидко реагувати на проблеми, які можуть виникнути після запуску.
- Поступові зміни — невеликі, поетапні зміни дозволяють користувачам поступово адаптуватися до нового функціоналу.
- Швидкість розробки — CI/CD дозволяє компаніям залишатися конкурентоздатними на ринку завдяки можливості швидко випускати новий функціонал.
