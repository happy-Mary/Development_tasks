// TODO: https://www.sitepoint.com/recursion-functional-javascript/

function firstFactorial(number) {
  if (!number) return 1;
  return n * firstFactorial(n-1);
}

console.log(firstFactorial(4))
// A: stack: 4 * firstFactorial(3) 
// B: stack: 3 * firstFactorial(2) 
// C: stack: 2 * firstFactorial(1) 
// D: stack: 1 * firstFactorial(0) 
// E: return 1;
// go out from stack (LIFO):
// D: 1*1 = 1 returns to C
// C: 2*1 = 2 returns to B
// B: 3*2 = 6 returns to A
// A: 4*6 = 24; 
// stack is empty


// factorial(5)
// = 5 * factorial(4)
// = 5 * 4 * factorial(3)
// = 5 * 4 * 3 * factorial(2)
// = 5 * 4 * 3 * 2 * factorial(1)
// = 5 * 4 * 3 * 2 * 1 * factorial(0)
// = 5 * 4 * 3 * 2 * 1 * 1 (base case: factorial(0) returns 1)
// = 120