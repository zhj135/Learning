const { arr, swap } = require('./common.js');
// 快速排序 随机选取一个元素（本例中是第一个元素），将这个元素排在数组的第i个位置，使得数组中i位置以前的值都小于等于随机选取的元素，以后的值都大于等于这个随机元素，并重复执行这一步
// 优化策略： 在数组长度为5-15（视本地环境)的情况下，改用插入排序，V8在数组长度小于10的场景中采用了此策略。
function sort(arr, lo = 0, hi = arr.length) {
  if (lo >= hi) return;
  const index = partition(arr, lo, hi);
  sort(arr, lo, index - 1);
  sort(arr, index + 1, hi)
}
function partition(arr, lo, hi) {
  // debugger;
  let i = lo;
  let j = hi;
  while (true) {
    while (arr[++i] < arr[lo]) if (i === hi) break;
    while (arr[--j] > arr[lo]) if (j === lo) break;
    if (i >= j) break;
    swap(arr, i, j)
  }
  swap(arr, lo, j)
  return j;
}
sort(arr);
console.log('res::', arr);
