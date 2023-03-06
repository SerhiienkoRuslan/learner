### 1. Розкажіть, які є способи копіювання простого об’єкта типу obj = {a: 1, b: 2, c: 3}
### 2. Напишіть deep clone для об’єкта.
### 3. Назвіть різні способи, як поміняти місцями значення двох змінних.
140.Напишіть функцію Sleep (ms), яка зупиняє виконання async-функції на заданий проміжок часу.
141.Реалізуйте один з методів масиву (наприклад, splice).
142.Напишіть функцію з RegExp для знаходження всіх HTML-посилань у рядку.
143.Реалізуйте функцію, яка виконає callback для всіх елементів певної гілки DOM-дерева.
144.Реалізуйте таблицю з віртуальним скролом.
145.Реалізуйте функцію перетворення URL query рядка в JSON.

```js
const inData = "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue";


function queryObjectify(arg) {
// ??
}

queryObjectify(inData)
/* Результатом виконання для вхідного рядка, повинен бути наступний об’єкт
{
'user': {
'name': {
'firstname': 'Bob',
'lastname': 'Smith'
},
'favoritecolor': 'Light Blue'
}
};
*/
```

146.Реалізуйте функцію знаходження перетину двох масивів.

```js
const first = [1, 2, 3, 4];
const second = [3, 4, 5, 6];

function intersection (a, b) {
// ??
}

intersection(first, second) // -> [3, 4]
```

147.Реалізуйте функцію / клас для генерації HTML.

```js
const HTMLConstruct = {};

HTMLConstruct.span('foo'); // -> <span>foo</span>
HTMLConstruct.div.span('bar'); // -> <div><span>bar</span></div>

HTMLConstruct.div.p(
HTMLConstruct.span('bar'),
HTMLConstruct.div.span('baz')
); // -> <div><p><span>bar</span><span>baz</span></p></div>
```

148.Якщо є проєкт з обмеженими термінами та некритичною продуктивністю, чим будете керуватися при виборі бібліотек, підходів? Чи все ж будете звертати увагу на продуктивність? Або навпаки: терміни нелімітовані, продуктивність важлива. Ваші дії?
43.Реалізуйте асинхронний метод filter для Array (повинні працювати await).
44.Реалізуйте функцію reduce за допомогою рекурсії.
45.Як можна було б зробити toggle-компонент, як в iPhone, без використання JS?
