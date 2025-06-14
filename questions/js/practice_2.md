Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

```js
const twoSum = function(nums, target) {
   const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    
    return [];
};
 const res = twoSum([2,7,11,15], 9)
 console.log(res);
```

console.log(romanToInt("III"));      // 3
console.log(romanToInt("LVIII"));    // 58
console.log(romanToInt("MCMXCIV"));  // 1994
```js
var romanToInt = function(s) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let total = 0;

    for (let i = 0; i < s.length; i++) {
        const currentVal = romanMap[s[i]];
        const nextVal = romanMap[s[i + 1]];

        if (nextVal > currentVal) {
            // Subtractive case (e.g., IV, IX, etc.)
            total += nextVal - currentVal;
            i++; // Skip next character since we already used it
        } else {
            total += currentVal;
        }
    }

    return total;
};
```


Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
```js
/**
 * @param {string[]} strs
 * @return {string}
 */
// var longestCommonPrefix = function(strs) {
//     if (!strs.length) return '';

//     let res = '';

//     for (let i = 0; i < strs[0].length; i++) {
//         const char = strs[0][i];

//         for (let j = 1; j < strs.length; j++) {
//             if (i >= strs[j].length || strs[j][i] !== char) {
//                 return res;
//             }
//         }

//         res += char;
//     }

//     return res;
// };

var longestCommonPrefix = function(strs) {
    if (!strs.length) return "";

    strs.sort(); // Lexicographical sort
    const first = strs[0];
    const last = strs[strs.length - 1];
    let i = 0;

    while (i < first.length && first[i] === last[i]) {
        i++;
    }

    return first.slice(0, i);
};
```

20. Valid Parentheses
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2 !== 0) {
        return false;
    }

    const mapp = {
        '(': ')',
        '{': '}',
        '[': ']'
    }

    if (!mapp[s[0]]) {
        return false;
    }

    const temp = [];
    let res = true;

    for (let i = 0; i < s.length; i++) {
        const currentEl = s[i];

        if (mapp[currentEl]) {
            temp.push(currentEl);
        } else {
            const prevValue = temp[temp.length - 1];
            const isMatch = mapp[prevValue] === currentEl;

            if (isMatch) {
                temp.pop();
            } else {
                res = false;
                break;
            }
        }
    }

    if (temp.length) {
        res = false
    }

    return res;
};
```
optz
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2 !== 0) return false;

    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (map[char]) {
            stack.push(map[char]); // Push expected closing bracket
        } else {
            if (stack.pop() !== char) return false;
        }
    }

    return stack.length === 0;
};
```


