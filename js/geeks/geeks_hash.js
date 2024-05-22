function isSubset(a1, a2) {
	if (a2.length > a1.length) return 'No';
	const hashMap = {};
	let checkCount = 0;

	a2.forEach((n) => (hashMap[n] = true));

	for (let i = 0; i < a1.length; i++) {
		const el = a1[i];
		if (hashMap[el]) checkCount++;

		if (checkCount === a2.length) return 'Yes';
	}

	return 'No';
}

console.log('isSubset:', isSubset([8, 4, 5, 3, 1, 7, 9], [5, 1, 3, 7, 9]));
console.log('isSubset:', isSubset([8, 4, 5, 3, 1, 7, 9], [5, 9, 1, 3, 9]));
console.log('isSubset:', isSubset([10, 5, 2, 23, 19], [19, 5, 3]));
