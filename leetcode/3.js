// 3. Longest Substring Without Repeating Characters
// Given a string, find the length of the longest substring without repeating characters.

// Example 1:

// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3. 
// Example 2:

// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 
// Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
/**
 * @param {string} s
 * @return {number}
 */
// 96 ms.  42.3 MB
var lengthOfLongestSubstring = function(s) {
  const arr = Array.from(s)
  let maxLength = 0
  let tempArr = []
  for(let i = 0; i <= arr.length; i += 1) {
      const tempIndex = tempArr.indexOf(arr[i])
      tempArr.push(arr[i])
      if (tempIndex === -1) {
          if (i === arr.length - 1) {
              maxLength = maxLength > tempArr.length ? maxLength : tempArr.length
          }
          continue
      }
      maxLength = maxLength > tempArr.length - 1 ? maxLength : tempArr.length - 1
      tempArr = tempArr.slice(tempIndex + 1)
  }
  return maxLength
};
// 96 ms.  38 MB
var lengthOfLongestSubstring = function(s) {
  let n = s.length, ans = 0;
  const map = new Map(); // current index of character
  // try to extend the range [i, j]
  for (let j = 0, i = 0; j < n; j++) {
      if (map.has(s.charAt(j))) {
          i = Math.max(map.get(s.charAt(j)), i);
      }
      ans = Math.max(ans, j - i + 1);
      map.set(s.charAt(j), j + 1);
  }
  return ans;
};
