function trampoline(fn) {
  return function trampolined(...args) {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}

const countVowels = curry(
  2,
  trampoline(function countVowels(count, str) {
    count += isVowel(str[0]) ? 1 : 0;
    if (str.length <= 1) return count;
    return () => countVowels(count, str.slice(1));
  })
)(0);

// can be implemented with a Free monad
