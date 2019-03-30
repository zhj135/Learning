// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
// Example 2:

// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} s
 * @return {string}
 */
// 84 ms 35.9 MB
var longestPalindrome = function(s) {
  if (s.length <= 1) return s
  let maxStr = ''
  function findMaxStr(s, low, high) {
      while (low >= 0 && high < s.length ) {
          if (s[low] === s[high]) {
              if (high - low + 1 > maxStr.length) {
                  maxStr = s.slice(low, high + 1)
              }
              low -= 1
              high += 1
              continue
          }
          break
      }
  }
  for(let i = 0; i < s.length; i += 1) {
      findMaxStr(s, i, i)
      findMaxStr(s, i, i + 1)
  }
  return maxStr
};
