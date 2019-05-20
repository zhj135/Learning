// 9.Palindrome Number
// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

/**
 * @param {number} x
 * @return {boolean}
 */
// 184ms, 45.8M
var isPalindrome = function(x) {
  return String(x).split('').reverse().join('') == x
};

// 根据提示，不转化字符串，且比较一半即可，时间内存消耗与上同
var isPalindrome = function(x) {
  if (x < 0 || (x % 10 == 0 && x != 0)) return false
  let reverseNum = 0
  while(x > reverseNum) {
      reverseNum = reverseNum * 10 + x % 10
      x = parseInt(x / 10)
  }
  return x === reverseNum || x === parseInt(reverseNum / 10)
};