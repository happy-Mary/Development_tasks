// RangeError: Maximum call stack size exceeded
const find3Numbers = (arr, N) => {
  let max = N - 1;    // index of maximum element in the array
  let min = 0;        // index of minimum element in the array

  const smaller = new Array(N);
  smaller[0] = -1;    // first entry will always be -1
  // updating the smaller array by finding the index of
  // minimum element before the current element
  for (let i = 1; i < N; i++) {
    if (arr[i] <= arr[min]) {
        min = i;    // updating the index of minimum element
        smaller[i] = -1;
    } 
    else smaller[i] = min;
  }

  const greater = new Array(N);
  greater[N - 1] = -1;    // last entry will always be -1
  // updating the greater array by finding the index of
  // maximum element after the current element
  for (let i = N - 2; i >= 0; i--) {
    if (arr[i] >= arr[max]) {
      max = i;    // updating the index of maximum element
      greater[i] = -1;
    }
    else greater[i] = max;
  }

  const r = []; // list to store the three numbers

  // iterating over the array to find the three numbers
  for (let i = 0; i < N; i++) {
    if (smaller[i] != -1 && greater[i] != -1) {
      // found the three numbers that satisfy the condition
      r.push(arr[smaller[i]]);
      r.push(arr[i]);
      r.push(arr[greater[i]]);
      return r;    // returning the result
    }
  }

  return r;
}

console.log(find3Numbers([1, 2, 1, 1, 3], 5))