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

Time limit cache
```js
var TimeLimitedCache = function() {
    this.cache = new Map(); // key -> { value, expireTime }
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration
 * @return {boolean}
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const now = Date.now();
    const existing = this.cache.get(key);
    const isUnexpired = existing && existing.expireTime > now;

    // Overwrite value and reset expiration
    this.cache.set(key, {
        value,
        expireTime: now + duration
    });

    return !!isUnexpired;
};

/** 
 * @param {number} key
 * @return {number}
 */
TimeLimitedCache.prototype.get = function(key) {
    const now = Date.now();
    const entry = this.cache.get(key);

    if (!entry || entry.expireTime <= now) {
        this.cache.delete(key); // Cleanup if expired
        return -1;
    }

    return entry.value;
};

/** 
 * @return {number}
 */
TimeLimitedCache.prototype.count = function() {
    const now = Date.now();
    let count = 0;

    for (const [key, { expireTime }] of this.cache.entries()) {
        if (expireTime > now) {
            count++;
        } else {
            this.cache.delete(key); // Cleanup expired
        }
    }

    return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
```
