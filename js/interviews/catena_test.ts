// Write a function that takes an array of integers arr and 
// a positive integer K as input. 
//
// The function should return the count of subarrays in the array 
// that meet the following conditions:
//
// * The sum of all elements in the subarray is less than or equal to K.
// * The subarray contains at most one zero.
//
// Note:
// * An empty subarray is considered to have a sum of zero.
//
// Example: 
//
// arr = [1, 0, 2, 3, 4, 1]
// K = 6;
// Result: 
//
// Output: 4

const sumSubArr = (arr: number[], K: number): number => {
  if (arr.length < 2) return 0;

  let subArrCount = 0;
  let zeroCount = (arr[0] === 0) ? 1 : 0;
  let lastSum = arr[0];

  for(let i = 1; i < arr.length; i++) {
    const el = arr[i];
    // 0 < sum <= K
    const sum = el + lastSum;

    if (el === 0) zeroCount+=1;

    if (sum > K || zeroCount > 1) {
      zeroCount = (el === 0) ? 1 : 0;
      lastSum = el;
      continue;
    }

    lastSum = sum;
    subArrCount+=1;
  }

  console.log(subArrCount);
  return subArrCount;
}

sumSubArr([1, 0, 2, 3, 4, 1], 6);
// [ [1, 0], [1, 0, 2], [1, 0, 2, 3], [4, 1] ]
sumSubArr([1, 0, 0, 0, 2, 3, 4, 1], 6);
// [ [1, 0],  [0, 2], [0, 2, 3], [4, 1] ]
sumSubArr([7, 2, 0, 1, 4, 1, 0, 1, 0], 5);
// [ [2, 0], [2, 0, 1], [4, 1], [4, 1, 0], [1, 0] ]
sumSubArr([7, 2, 0, 1, 4, 1, 0, 1, 0, 2], 5);
// [ [2, 0], [2, 0, 1], [4, 1], [4, 1, 0], [1, 0], [1, 0, 2] ]
