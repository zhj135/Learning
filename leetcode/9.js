// 9.Palindrome Number
// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  return String(x).split('').reverse().join('') == x
};