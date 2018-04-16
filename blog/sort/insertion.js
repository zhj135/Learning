const { arr, swap } = require('./common.js');
// 插入排序，类似扑克抓牌时的理牌方式，将新元素依次与前一个数组值比较，交换，直至正确位置
// for (let i = 1; i < arr.length; i += 1) {
//   for (let j = i - 1; j >= 0; j -= 1) {
//     if (arr[j] > arr[j + 1]) {
//       swap(arr, j, j + 1)
//     }
//   }
// }
console.time('test')

// v8中对长度10以内的数组，选用插入排序
const comparefn = function (x, y) {
  // 在此省略其他数据类型判断，只考虑数字
  if (x == y) return 0;
  else return x < y ? -1 : 1;
};
function InsertionSort(a, from, to) {
  for (var i = from + 1; i < to; i++) {
    var element = a[i];
    for (var j = i - 1; j >= from; j--) {
      debugger;
      var tmp = a[j];
      var order = comparefn(tmp, element);
      if (order > 0) {
        a[j + 1] = tmp;
      } else {
        break;
      }
    }
    a[j + 1] = element;
  }
};
InsertionSort(arr, 0, arr.length)
console.log('arr::', arr);
console.timeEnd('test')

