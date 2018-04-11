const { arr, swap } = require('./common.js');
// 希尔排序是基于插入排序的排序算法，先将数组分成h个有序子数组，再减少h的值，以部分有序的数组排序的方式加快插入排序速度

let h = 1;
while (2 * h < arr.length) h *= 2
while (h >= 1) {
  for (let i = h; i < arr.length; i += h) {
    for (let j = i - h; j >= 0; j -= h) {
      if (arr[j] > arr[j + h]) {
        swap(arr, j, j + h)
      }
    }
  }
  h -= 1;
}
console.log('arr:', arr)
