// Function to find subarray with given sum
const findSubarray = (arr) => {
	const n = arr.length;
	const res = [];
	let maxSum = 0;
	let maxSumIdx = -1;

	for (let i = 0; i < n; i++) {
		if (arr[i] >= 0) {
			if (!res.length) res.push([]);
			res[res.length - 1].push(arr[i]);
		} else if (res.length) {
			res.push([]);
		}
	}

	for (let i = 0; i < res.length; i++) {
		const sum = res[i].reduce((acc, num) => acc + num, 0);
		if (sum > maxSum) {
			maxSum = sum;
			maxSumIdx = i;
		} else if (sum === maxSum) {
			if (res[i].length > res[maxSumIdx].length) maxSumIdx = i;
		}
	}
	return maxSumIdx >= 0 ? res[maxSumIdx] : maxSumIdx;
};
console.log('findSubarray');
console.log(findSubarray([1, 2, 5, -7, 2, 3])); // [1, 2, 5]
console.log(findSubarray([-1, -2, -5, -7, -2, -3])); // -1
console.log(findSubarray([2, -1, 1, 1])); // [1, 1]

// Major element
const majorityElement = (a, size) => {
	const minAmount = parseInt(size / 2);
	let majorValue = -1;
	let majorAmount = 1;
	const map = {};

	for (let i = 0; i < size; i++) {
		const num = a[i];
		map[num] = (map[num] ?? 0) + 1;
	}
	console.log(map);
	for (let key in map) {
		const amount = map[key];
		if (amount >= minAmount && amount > majorAmount) {
			majorValue = parseInt(key);
			majorAmount = amount;
		}
	}

	return majorValue;
};
console.log('\nmajorityElement');
console.log(majorityElement([3, 1, 3, 3, 2], 5));
console.log(majorityElement([3, 1, 2], 3));
const nums1 = '6 1 15 19 9 13 12 6 7 2 10 4 1 14 11 14 14 13';
console.log(majorityElement(nums1.split(' '), 18));

const M1 = [
	[1, 2, 1, 2],
	[2, 2, 2, 1],
	[2, 1, 2, 2],
	[2, 1, 1, 1],
];

const distinct = (arr, n) => {
	const distArr = [];
  const matrixMap = {};
	for (let i = 0; i < n; i++) {
		const el = arr[0][i];
		if (arr.every((subArr) => subArr.includes(el))) distArr.push(el);
	}

	return distArr.length;
};
