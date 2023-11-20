const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

// Proper implementation in JS (while loop):
function binarySearch(arr, target) {
  let min = 0;
  let max = arr.length-1;

  while (min <= max) {
    const guess = Math.floor((min + max) / 2)

    if (arr[guess] === target) return guess;
    else if (arr[guess] < target) min = guess + 1;
    else max = guess - 1;
  }

  return -1;
}

console.log(`Result for 67: ${binarySearch(primes, 67)}`)
console.log(`Result for non existing: ${binarySearch(primes, 10)}`)
console.log(`Result for one step: ${binarySearch(primes, 97)}`)

// training implementation (closure)
function binarySearch_1(arr, primary, minIdx, maxIdx) {
  if (arr[minIdx] === primary) return minIdx
  else if (arr[maxIdx] === primary) return maxIdx
  else if (maxIdx < minIdx) return -1

  const midIdx = Math.round((minIdx + maxIdx) / 2);

  if (arr[midIdx] === primary) return midIdx;

  minIdx = (arr[minIdx] < primary) ? midIdx + 1 : minIdx;
  maxIdx = (arr[minIdx] > primary) ? midIdx - 1 : maxIdx;

  return binarySearch_1(arr, primary, minIdx, maxIdx)
}

const position = binarySearch_1(primes, 67, 0, primes.length-1);
const position_no = binarySearch_1(primes, 10, 0, primes.length-1);
const position_last = binarySearch_1(primes, 97, 0, primes.length-1);

console.log(`\nResult 1: found index ${position}, value: ${primes[position]}`)
console.log(`Result 2: found index ${position_no}, value: ${primes[position_no]}`)
console.log(`Result 3: found index ${position_last}, value: ${primes[position_last]}`)

