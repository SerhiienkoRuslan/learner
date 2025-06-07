Memoization

```js
function memoize(fn) {
    const cache = new Map();
    let callCount = 0;

    const memoizedFn = function (...args) {
        const key = args.join(',');

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        callCount++;
        return result;
    };

    memoizedFn.getCallCount = () => callCount;

    return memoizedFn;
}
```

Cancelable interval

```js
/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    fn(...args);

    const timeoutId = setInterval(() => {
        fn(...args);
    }, t);

    return function cancelFn() {
        clearInterval(timeoutId);
    };
};
```

Time limit
```js
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    
    return async function(...args) {
        return Promise.race([
            fn(...args), // actual function execution
            new Promise((_, reject) => 
                setTimeout(() => reject("Time Limit Exceeded"), t)
            )
        ]);
    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
```
