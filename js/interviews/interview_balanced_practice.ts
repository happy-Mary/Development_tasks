const checkIfBalanced = (arr: number[]) => {
  // non valid array
  if (!arr || arr.length < 2) return false;

  const lastIdx = arr.length - 1;
  const leftS: number[] = [];
  const rightS: number[] = [];

  for (let index = 0; index < lastIdx; index++) {
    const currLeft = arr[index];
    const currRight = arr[lastIdx - index];
    // take previous num for cumulative sum
    const prevLeft = leftS[index - 1] ?? 0;
    const prevRight = rightS[index - 1] ?? 0;

    leftS.push(prevLeft + currLeft);
    rightS.push(prevRight + currRight)
  }
  // const isBal = rightS.reverse().some((n, i) => leftS[i] === n);
  const isBal = leftS.some((n, i) => rightS[rightS.length - 1 - i] === n);
  console.log(isBal);
  return isBal;
}

checkIfBalanced([1, 2, 3, 3, 5, 4])
checkIfBalanced([2, 2])
checkIfBalanced([0, 2, -8, 0, -6, 0, 1, -1, -10])
checkIfBalanced([1, 2, 3, 3])
console.log('\n')