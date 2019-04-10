// 7. Reverse Integer
// Given a 32-bit signed integer, reverse digits of an integer.

// Example 1:

// Input: 123
// Output: 321
// Example 2:

// Input: -123
// Output: -321
// Example 3:

// Input: 120
// Output: 21
// Note:
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
// 104ms 35.9M
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  const res = x
  if (x > 0) x = Number(x.toString().split('').reverse().join(''))
  else x = -Number(x.toString().split('').slice(1).reverse().join(''))
  return x > Math.pow(2, 31) || x < - Math.pow(2, 31) ? 0 : x
};
// 80ms 35.8M
var reverse = function(x) {
  let res = 0
  let i = 0
  while (x != 0) {
      let remainder = x % 10
      x = parseInt(x / 10)
      res = res * 10 + remainder
  }
  return res > Math.pow(2, 31) || res < - Math.pow(2, 31) ? 0 : res
};