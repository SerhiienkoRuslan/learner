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

Debounce
```js
var debounce = function(fn, t) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, t);
    };
};
```

Promise all
```js
var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        if (functions.length === 0) {
            resolve([]);
            return;
        }

        functions.forEach((fn, index) => {
            fn()
                .then(result => {
                    results[index] = result;
                    completed++;
                    if (completed === functions.length) {
                        resolve(results);
                    }
                })
                .catch(reject); // reject immediately if any promise fails
        });
    });
};
```

Chunk
```js
var chunk = function(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};
```


Group by
```js
Array.prototype.groupBy = function(fn) {
    return this.reduce((grouped, item) => {
        const key = fn(item);
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(item);
        return grouped;
    }, {});
};
```

Sort by
```js
var sortBy = function(arr, fn) {
    return arr.sort((a,b) => fn(a)-fn(b))
};

var sortBy = function(arr, fn) {
    return arr.slice().sort((a, b) => {
        const valA = fn(a);
        const valB = fn(b);
        return valA - valB;
    });
};
```

Join 2 arr
```js
var join = function(arr1, arr2) {
    const map = new Map();

    for (const item of arr1) {
        map.set(item.id, { ...item });
    }

    for (const item of arr2) {
        if (map.has(item.id)) {
            const merged = { ...map.get(item.id), ...item };
            map.set(item.id, { ...map.get(item.id), ...item });
        } else {
            map.set(item.id, { ...item });
        }
    }

    return Array.from(map.values()).sort((a, b) => a.id - b.id);
};
```

Flat arr
```js
var flat = function (arr, n) {
    if (n === 0) return arr;

    const result = [];

    for (const el of arr) {
        if (Array.isArray(el)) {
            result.push(...flat(el, n - 1)); // recursively flatten
        } else {
            result.push(el);
        }
    }

    return result;
};
```

Input: obj = [null, 0, false, 1]
Output: [1]
Explanation: All falsy values have been removed from the array.
Example 2:

Input: obj = {"a": null, "b": [false, 1]}
Output: {"b": [1]}
Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.
Example 3:

Input: obj = [null, 0, 5, [0], [false, 16]]
Output: [5, [], [16]]
Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and removed.
```js
/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if (Array.isArray(obj)) {
        return obj
            .map(compactObject)
            .filter(Boolean);
    } else if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const key in obj) {
            const value = compactObject(obj[key]);
            if (Boolean(value)) {
                result[key] = value;
            }
        }
        return result;
    } else {
        return obj;
    }
};
```


