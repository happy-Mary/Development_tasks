const zero = (func) => typeof func === 'function' ? func(0) : 0;
const one = (func) => typeof func === 'function' ? func(1) : 1;
const two = (func) => typeof func === 'function' ? func(2) : 2;
const three = (func) => typeof func === 'function' ? func(3) : 3;
const four = (func) => typeof func === 'function' ? func(4) : 4;
const five = (func) => typeof func === 'function' ? func(5) : 5;
const six = (func) => typeof func === 'function' ? func(6) : 6;
const seven = (func) => typeof func === 'function' ? func(7) : 7;
const eight = (func) => typeof func === 'function' ? func(8) : 8;
const nine = (func) => typeof func === 'function' ? func(9) : 9;

function plus(num) {
  return (x) => x + num;
}
function minus(num) {
  return (x) => x - num;
}
function times(num) {
  return (x) => x * num;
}
function dividedBy(num) {
  return (x) => Math.floor(x / num)
}

console.log(seven(times(five()))); // must return 35
console.log(four(plus(nine()))); // must return 13
console.log(eight(minus(three()))); // must return 5
console.log(six(dividedBy(two()))); // must return 3
console.log(three(dividedBy(eight()))) //: expected 0