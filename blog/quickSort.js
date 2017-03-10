var arr = [];
for(let i=0;i<10;i++){
	let temp = Math.random()*100;
	arr.push(parseInt(temp));
}
console.log(arr);
// arr.forEach((item, index) => {
// 	let flag = item;
// 	let minArr = [];
// 	let MaxArr = [];
// 	for(let i=index;i<arr.length;i++){
// 		if (arr[i] <= flag){
// 			minArr.push(arr[i]);
// 		} else {
// 			MaxArr.push(arr[i]);
// 		}
// 	}
// })
function swap(arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}
function quickSort(arr){
	if (arr.length <= 1) {
		return arr;
	}
	let mid = arr[0];
	let finalIndex = 1;
	let left = [];
	let right = [];
	for(let i=1;i<arr.length;i++){
		if (arr[i] <= mid) {
			swap(arr, i, finalIndex)
			finalIndex++;
		}
	}
	swap(arr, 0, finalIndex-1)
	console.log(arr)
	left = arr.slice(0, finalIndex-1);
	console.log('left: ' + left)
	right = arr.slice(finalIndex, arr.length)
	console.log('right: ' + right)
	return quickSort(left).concat(arr[finalIndex-1], quickSort(right))
}
quickSort(arr);
console.log(arr)
