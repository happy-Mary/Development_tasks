//* maximum subarray algorithm (Kadane's algorithm)
//* It is used to find the subarray (subsequence) with the maximum sum in an array of numbers.
function maxSumSubsequence(arr) {
  let maxEndingHere = arr[0];
  let maxSoFar = arr[0];

  // Iterate over the array starting from the second element
  for (let i = 1; i < arr.length; i++) {
      // Calculate the maximum sum ending at the current position
      maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);

      // Update the maximum sum found so far
      maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// Example usage:
let arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSumSubsequence(arr1)); // Output 6

let arr2 = [1, 2, 3, -2, 5];
console.log(maxSumSubsequence(arr2)); // Output: 9

/* Explanation:
1. We initialize two variables maxEndingHere and maxSoFar to the first element of the array. 
  These variables keep track of the maximum sum of subarrays ending at the current position 
  and the maximum sum found so far, respectively.
2. We iterate over the array starting from the second element.
3. At each position i, we calculate the maximum sum of subarrays ending at i by choosing 
  the maximum of either the current element arr[i] 
  or the sum of the previous maximum subarray ending at i-1 plus the current element (maxEndingHere + arr[i]).
4. We update maxSoFar to be the maximum of maxSoFar and maxEndingHere. 
  This ensures that maxSoFar always contains the maximum sum subsequence found so far.
5. Finally, we return maxSoFar, which represents the maximum sum subsequence of the input array.
*/