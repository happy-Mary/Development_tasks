function keyboardError(correct, wrong) {
	const filtered = correct.split('').filter((char) => !wrong.includes(char));
	return [...new Set(filtered)];
}

// console.log(keyboardError('this is awesome!', 'thjs js kwesome!'))
// console.log(keyboardError('you can do this!', 'yhu cen dh this?'))
// console.log(keyboardError('nice challenge', 'nice challenge'))

function getPrice(item) {
	const start = item.indexOf('(') + 1;
	const end = item.indexOf(')');
	return item.substring(start, end);
}

// console.log(getPrice('Ice ($4.20)'));
// console.log(getPrice('Chips ($1.35)'));

function swap(numbers) {
	if (numbers.length <= 1) return numbers;

	const lastIndex = numbers.length - 1;
	return [numbers[lastIndex], ...numbers.slice(1, lastIndex), numbers[0]];
}

// with numbers mutation:
function swapMutate(numbers) {
	if (numbers.length <= 1) return numbers;
	const first = numbers.shift();
	const last = numbers.pop();
	return [last, ...numbers, first];
}

// console.log(swap([1,6,2,7,9,3,4]), swapMutate([1,6,2,7,9,3,4]));
// console.log(swap([1,5,3,7,2,7,3]), swapMutate([1,5,3,7,2,7,3]));
// console.log(swap([1, 0]), swapMutate([1, 0]));
// console.log(swap([3]), swapMutate([3]));
// console.log(swap([]), swapMutate([]));

function littleChild(child1, child2) {
	const isChild1Range = 0 <= child1 && child1 <= 14;
	const isChild2Range = 0 <= child2 && child2 <= 14;
	return (isChild1Range && !isChild2Range) || (!isChild1Range && isChild2Range);
}
// console.log(littleChild(-3, 11)) // true
// console.log(littleChild(0, 3)) // false
// console.log(littleChild(-2, 23)) // false

function getURLParams(url) {
	const params = url.split('?')[1];

	if (!params) return [];
	return params.split('&').map((char) => {
		return char.substring(char.indexOf('=') + 1);
	});
}

getURLParams('https://jscodebox.com/test.xml?id=3&value=file');
getURLParams('https://jscodebox.com/');
getURLParams('https://jscodebox.com/delete.php?api_key=njkASF5');

function getReducedPrice(price, discount) {
	const afterDiscount = price - (discount / 100) * price;
	const result = parseFloat(afterDiscount.toFixed(2));
	console.log(result);
	return parseFloat(afterDiscount.toFixed(2));
}

// getReducedPrice(1000, 20) // 800
// getReducedPrice(42, 3) // 40.74

function solveTicTacToe(line1, line2, line3) {
	line1 = line1[0].split('');
	line2 = line2[0].split('');
	line3 = line3[0].split('');
	// Check Rows
	const f1 = line1.every((x) => x === line1[0]);
	const f2 = line2.every((x) => x === line2[0]);
	const f3 = line3.every((x) => x === line3[0]);
	if (f1 || f2 || f3) return true;

	// Check Columns
	for (let i = 0; i < 3; i++) {
		if (line1[i] == line2[i] && line2[i] == line3[i]) return true;
	}
	// Check Diagonals
	if (line1[0] == line2[1] && line2[1] == line3[2]) return true;
	if (line1[2] == line2[1] && line2[1] == line3[0]) return true;

	return 'Tie';
}

console.log(solveTicTacToe(['XOX'], ['XXX'], ['OXO'])); // true
console.log(solveTicTacToe(['OXO'], ['XOO'], ['XOX'])); // 'Tie'
console.log(solveTicTacToe(['O-X'], ['-XO'], ['OOX'])); // 'Tie'
console.log(solveTicTacToe(['OXX'], ['XOO'], ['XOO'])); //true
console.log(solveTicTacToe(['-O-'], ['-OX'], ['-O-'])); // true

const bin2dec = (bin) => parseInt(bin, 2);
console.log(bin2dec('110010'));
console.log(bin2dec('10'));
console.log(bin2dec('1'));
console.log(bin2dec('101010'));
console.log(bin2dec('110011'));

const dec2bin = (dec) => dec.toString(2);
console.log(dec2bin(10)); // Output: "1010"
console.log(dec2bin(23)); // Output: "10111"

// TODO: implement deepClone with arrays & objects tree
function cloneObject(object, removeProperties) {
	const copyObj = { ...object };
	removeProperties.forEach((prop) => delete copyObj[prop]);
	console.log(copyObj);
	return copyObj;
}

cloneObject(
	{
		name: 'Iron Man',
		age: 42,
		superPower: 'None',
		friends: 0,
		overweight: true,
		hungry: true,
	},
	['overweight', 'hungry']
);
console.log('\n');
/**
 * max representing the maximum number of groups in the queue & an array visitors
 * 'X' stands for one person and 'O' for one companion
 * A group is minimum one 'O' and any number of 'X'
 * Check if all groups fit into the queue
 * Return 'full' if all fit
 * return the number of groups that are too many or not full
 */
function cinemaQueue1(max, visitors) {
	const persons = visitors.reduce((num, curr) => {
		return curr === 'X' ? (num += 1) : num;
	}, 0);

	const left = (max -= persons);

	if (left === 0) return 'full';
	else if (left > 0) return `not full: ${left}`;
	else if (left < 0) return `too much: ${Math.abs(left)}`;
}

function cinemaQueue(max, visitors) {
	const persons = visitors.filter((p) => p === 'X');

	if (persons.length === max) return 'full';
	if (persons.length < max) {
		return `not full: ${max - persons.length}`;
	}

	if (persons.length > max) {
		return `too much: ${persons.slice(max).length}`;
	}
}

function cinemaQueueFIFO(max, visitors) {
	let accept = 0;
	let left = 0;
	visitors.forEach((person) => {
		if (person !== 'X') return;
		if (accept === max) left += 1;
		if (accept < max) accept += 1;
	});

	if (accept === max) return left === 0 ? 'full' : `too much: ${left}`;
	else return `not full: ${max - accept}`;
}
// => full
const queue1 = cinemaQueue(6, [
	'X',
	'O',
	'X',
	'O',
	'O',
	'X',
	'X',
	'X',
	'O',
	'X',
]);
const queue1_F = cinemaQueueFIFO(6, [
	'X',
	'O',
	'X',
	'O',
	'O',
	'X',
	'X',
	'X',
	'O',
	'X',
]);
console.log(queue1, queue1_F);
// => 'too much: 2'
const queue2 = cinemaQueue(6, [
	'X',
	'O',
	'X',
	'O',
	'O',
	'X',
	'X',
	'X',
	'O',
	'X',
	'X',
	'X',
]);
const queue2_F = cinemaQueueFIFO(6, [
	'X',
	'O',
	'X',
	'O',
	'O',
	'X',
	'X',
	'X',
	'O',
	'X',
	'X',
	'X',
]);
console.log(queue2, queue2_F);
// => 'not full: 2'
const queue3 = cinemaQueue(4, ['X', 'O', 'X']);
const queue3_F = cinemaQueueFIFO(4, ['X', 'O', 'X']);
console.log(queue3, queue3_F);
// => 'not full: 5'
const queue4 = cinemaQueue(8, ['X', 'O', 'X', 'X']);
const queue4_F = cinemaQueueFIFO(8, ['X', 'O', 'X', 'X']);
console.log(queue4, queue4_F);

function camelCase(n) {
	return n
		.trim()
		.split(' ')
		.map((char, i) => {
			const firstLetter =
				i == 0 ? char.charAt(0).toLowerCase() : char.charAt(0).toUpperCase();
			return `${firstLetter}${char.slice(1)}`;
		})
		.join('');
}

console.log('\n');
console.log(camelCase('Camel Case'), 'camelCase');
console.log(camelCase('String not found'), '/ expected: stringNotFound');
console.log(camelCase('Nice Challenge'), '/ expected: niceChallenge');
console.log(camelCase(' Is not found '), '/ expected: isNotFound');
console.log(camelCase('CamelCase'), '/ expected: camelCase');

function lastButNotLeast(a, b, c) {
	const arr = [a % 10, b % 10, c % 10];
	console.log(a, b, c, [...new Set(arr)]);
	return [...new Set(arr)].length < 3;
}

lastButNotLeast(37, 17, 19);
lastButNotLeast(84, 23, 54);
lastButNotLeast(19, 17, 38);
lastButNotLeast(19, 29, 59);

function checkPassword(password, password_repeat) {
  // TODO: https://www.codeguage.com/courses/regexp/
  // const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[&$%§_\-]).{8,}$/;
	if (password.length < 8 || password !== password_repeat) return false;

	const hasCapital = /[A-Z]/.test(password);
	const hasNonCapital = /[a-z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasCharacter = /[&$%§\-_]/.test(password);

	return hasCapital && hasNonCapital && hasNumber && hasCharacter;
}

checkPassword('Joifd$3', 'Joifd$3');
checkPassword('YY&glk4Hfi_ffS', 'YY&glk4Hfi_ffS');
