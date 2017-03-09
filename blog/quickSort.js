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
function quickSort(arr){
	let mid = arr[0];
	let finalIndex = 0;
	for(let i=1;i<arr.length;i++){
		if (arr[i] < mid) {
			finalIndex++;
		}
		console.log(finalIndex)
	}
	let temp = mid;
	mid = arr[finalIndex];
	arr[finalIndex] = temp;
	console.log(arr)
}
quickSort(arr);
