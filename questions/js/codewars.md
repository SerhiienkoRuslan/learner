The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

Examples
```
"din"      =>  "((("
"recede"   =>  "()()()"
"Success"  =>  ")())())"
"(( @"     =>  "))((" 
```

```js
function duplicateEncode(word) {
  // Convert to lowercase for case-insensitive comparison
  word = word.toLowerCase();
  
  // Build the result string
  return [...word]
    .map((char, _, arr) =>
      arr.indexOf(char) === arr.lastIndexOf(char) ? '(' : ')'
    )
    .join('');
}

t("Testing for fixed tests", () => {
    assert.strictEqual(duplicateEncode("din"),"(((");
    assert.strictEqual(duplicateEncode("recede"),"()()()");
    assert.strictEqual(duplicateEncode("Success"),")())())","should ignore case");
    assert.strictEqual(duplicateEncode("(( @"),"))((");
  });
```
