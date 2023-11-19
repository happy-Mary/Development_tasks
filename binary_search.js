const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

function binarySearch(arr, primary, minIdx, maxIdx) {
  console.log(`step: min: ${minIdx}, max: ${maxIdx}`)

  if (arr[minIdx] === primary) return minIdx
  else if (arr[maxIdx] === primary) return maxIdx

  const midIdx = Math.round((minIdx + maxIdx) / 2);

  if (arr[midIdx] === primary) return midIdx

  minIdx = (arr[minIdx] < primary) ? midIdx + 1 : minIdx;
  maxIdx = (arr[minIdx] > primary) ? midIdx - 1 : maxIdx;

  return binarySearch(arr, primary, minIdx, maxIdx)
}

const position = binarySearch(primes, 67, 0, primes.length-1);
console.log(`Result: found index ${position}, value: ${primes[position]}`)