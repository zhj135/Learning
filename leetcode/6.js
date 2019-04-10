// ZigZag Conversion
// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);
// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:

// P     I    N
// A   L S  I G
// Y A   H R
// P     I

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
// 240 ms 70.5 MB
var convert = function(s, numRows) {
  if (s.length < 3 || numRows === 1) return s
  const fullArr = []
  let columnArr = []
  let column = 0
  let strIndex = 0
  while (strIndex < s.length) {
      const yuShu = column % (numRows - 1)
      const isSingle = yuShu !== 0
      for(let i = 0; i < numRows; i += 1) {
          if (isSingle && i !== (numRows - 1 - yuShu)) {
              columnArr.push('')
              continue
          }
          columnArr.push(s[strIndex])
          strIndex += 1
      }
      fullArr.push([...columnArr])
      columnArr = []
      column += 1
  }
  let res = ''
  for(let i = 0; i < numRows; i += 1){
      fullArr.forEach(column => {
          res += column[i] ? column[i] : ''
      })
  }
  return res
};
// 92ms 38.2M
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if (numRows === 1) return s
  let res = ''
  const len = 2 * numRows - 2
  for(let i = 0; i < numRows; i += 1) {
      let flag = true
      for(let j = 0; j + i < s.length;) {
          res += s[i + j]
          if (i === 0 || i === numRows - 1) {
              j += len
              continue
          }
          if (flag) {
              j = j + len - 2 * i
          } else {
              j = j + 2 * i
          }
          flag = !flag
      }
  }
  return res
};