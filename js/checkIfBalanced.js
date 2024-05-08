const checkIfBalanced_base = (arr) => {
	if (!arr || arr.length < 2) return false;

	const sumsLeft = [];
	let sumLeft = 0;
	const sumsRight = [];
	let sumRight = 0;
  const lastIdx = arr.length - 1;

	for (let i = 0; i < arr.length; i++) {
		// Build sums array from left to right
    sumLeft = sumLeft + arr[i];
    sumsLeft.push(sumLeft);
    // Build sums array from right to left
		sumRight = sumRight + arr[lastIdx - i];
		sumsRight.unshift(sumRight);
	} // Last leftSum needs to be ignored to keep at least one number in right split

	sumsLeft.pop(); // Fist rightSum needs to be ignored to keep at least one number in left split
	sumsRight.shift(); // Check if one sum at the same index matches  => array is balanced

	return sumsLeft.some((sumLeft, i) => sumLeft === sumsRight[i]);
};

const checkIfBalanced = (arr) => {
  if (!arr || arr.length < 2) return false;

  const leftList = [];
  let rightList = [];

  arr.reduce((acc, num) => {
    leftList.push(acc + num);
    return acc + num;
  }, 0);

  arr.reverse().reduce((acc, num) => {
    rightList.push(acc + num); // ? why do we need to put in front of the array
    return acc + num;
  }, 0);

  leftList.pop();
  rightList.pop();

  return leftList.some((sumLeft, i) => sumLeft === rightList[rightList.length - 1 - i]);
}

console.log('balanced: ', checkIfBalanced_base([-2, -1, -1, 5, 3, -2]), checkIfBalanced([-2, -1, -1, 5, 3, -2]))
console.log('balanced: ', checkIfBalanced_base([2, 2]), checkIfBalanced([2, 2]))
console.log('balanced: ', checkIfBalanced_base([0, 2, -8, 0, -6, 0, 1, -1, -10]), checkIfBalanced([0, 2, -8, 0, -6, 0, 1, -1, -10]))
console.log('balanced: ', checkIfBalanced_base([3, 3, 5, 2, 9]), checkIfBalanced([3, 3, 5, 2, 9]))
console.log('balanced: ', checkIfBalanced_base([2, -8, 0, -6, -10]), checkIfBalanced([2, -8, 0, -6, -10]))
// checkIfBalanced([2, 8, 4, 5, 1]) // true;
// checkIfBalanced([2, 2]); //true
// checkIfBalanced([2]); //false
// checkIfBalanced([]); //false
// checkIfBalanced(null); //false
// checkIfBalanced([-2, 8, 5, 1]); //true
// checkIfBalanced([-1, -1]); //true
// checkIfBalanced([-1, 0, 0, -1]); //true
// checkIfBalanced([0, 2, -8, 0, -6, 0, 1, -1, -10]); //true
