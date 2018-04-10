const { arr, swap } = require('./common.js');
// 选择排序，依次遍历数组找出最值，顺序排列
for (let i = 0; i < arr.length; i += 1) {
  let minValue = arr[i];
  let minIndex = i;
  for (let j = i + 1; j < arr.length; j += 1) {
    if (arr[j] < minValue) {
      minValue = arr[j];
      minIndex = j;
    }
  }
  swap(arr, i, minIndex)
}

console.log('res::', arr);
