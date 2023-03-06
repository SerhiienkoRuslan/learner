# Функції:

### 31.Яка різниця між декларацією функції (function declaration) та функціональним виразом (function expression)?
### 32.Що таке анонімна функція?
### 33.Розкажіть про стрілкові функції (arrow function). В чому полягають відмінності стрілкових функцій від звичайних?
### 34.Що таке і для чого використовують IIFE (Immediately Invoked Function Expression)?
### 35.Що таке hoisting, як він працює для змінних і функцій?
### 36.Що таке замикання (closure) і які сценарії його використання?
### 37.Як ви розумієте замикання? Що буде виведено в консолі в цьому випадку?

```js
    var f = function() {
      console.log(1);
    }
    
    var execute = function(f) {
      setTimeout(f, 1000);
    }
    
    execute(f); // res
    
    f = function() {
      console.log(2);
    }
```
### 38.Що таке рекурсія?
### 39.Що означає ключове слово this?
### 40.Що таке втрата контексту, коли відбувається і як їй запобігти?
### 41.Методи функцій bind / call / apply — навіщо і в чому різниця?
### 42.Поясніть, що означає currying. Наведіть приклад використання на практиці.
### 43.Наведіть приклад функції з мемоізацією. Коли варто застосовувати цю техніку?
### 44.Що таке чейнінг функцій? Напишіть приклад з використанням цього підходу.
### 45.У чому різниця між function і arrow function? Яким буде результат виконання коду?

```js
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
const go = (f, seed, acc) => {
const res = f(seed)
return res ? go(f, res[1], acc.concat([res[0]])) : acc
}
return go(f, seed, [])
}
```
