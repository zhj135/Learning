const arr = [];
for (let i = 0; i < 10; i++) {
	let temp = Math.random() * 100;
	arr.push(parseInt(temp));
}
console.log('init::', arr);
function swap(arr, a, b) {
	if (a === b) {
		return;
	}
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

module.exports = {
  arr,
  swap
};