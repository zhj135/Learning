const { arr, swap } = require('./common.js');
// 归并排序， 采用分治的思想，将大数组排序问题转化为两个较小有序数组的排序

function merge(a, lo, mid, hi) {
  let i = lo;
  let j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    aux[k] = a[k]
  }
  
  for (let k = lo; k <= hi; k++) {
    if (i > mid) a[k] = aux[j++];
    else if (j > hi) a[k] = aux[i++];
    else if (aux[i] > aux[j]) a[k] = aux[j++];
    else a[k] = aux[i++];
  }
  
}

let aux = [];

function sort(a, lo, hi) {
  if (lo >= hi) return;
  let mid = lo + parseInt((hi - lo) / 2);
  sort(a, lo, mid);
  sort(a, mid + 1, hi);
  merge(a, lo, mid, hi);
}

sort(arr, 0 , 10);
console.log('arr:', arr);
