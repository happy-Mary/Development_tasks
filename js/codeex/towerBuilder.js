function towerBuilder(nFloors) {
  let nValue = 1;
  let nEmpty = nFloors - nValue;

  return [...new Array(nFloors)].map(
    (_, index) => {
      const sEmpty = ' '.repeat(nEmpty);
      const sValue = '*'.repeat(nValue);
      nValue += 2;
      nEmpty -= 1;

      return `${sEmpty}${sValue}${sEmpty}`;
    }
  );
}

// function towerBuilder(nFloors) {
//   return [...new Array(nFloors)].map((_, index) => {
//     const sEmpty = ' '.repeat(nFloors - index - 1);
//     const sStar = '*'.repeat(index * 2 + 1);
//     return `${sEmpty}${sStar}${sEmpty}`;
//   });
// }

console.log(towerBuilder(1));
console.log(towerBuilder(2));
console.log(towerBuilder(3));
console.log(towerBuilder(4));
console.log(towerBuilder(5));
console.log(towerBuilder(6));

//* towerBuilder(5)
// [
//   "----*----",
//   "---***---",
//   "--*****--",
//   "-*******-",
//   "*********",
// ]