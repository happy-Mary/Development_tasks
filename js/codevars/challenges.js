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

function gHappy(string) {
	let result = false;
	for (let i = 0; i < string.length; i++) {
		const char = string[i];
		if (char !== 'g') continue;
		if (string.charAt(i - 1) === 'g' || string.charAt(i + 1) === 'g') {
			result = true;
			continue;
		}
		if (string.charAt(i - 1) !== 'g' || string.charAt(i + 1) !== 'g') {
			result = false;
			break;
		}
	}

	return result;
}

console.log(gHappy('Huggy Wuggy'));

function longest(string) {
	let nBiggest = 0;
	let nCurrent = 0;
	Array.from(string).forEach((char, i) => {
		if (i === 0 || char === string.charAt(i - 1)) nCurrent += 1;

		if (char !== string.charAt(i - 1)) {
			nBiggest = nCurrent > nBiggest ? nCurrent : nBiggest;
			nCurrent = 1;
		}
	});

	console.log('Biggest in a row: ', nBiggest);
	return nBiggest;
}

// longest('aaBBBBcDDee') // 4
// longest('') // 0
// longest('aaBBcDDDDDDeeFFFFFFFFg') // 8
// longest('aBBBccD') // 3
// longest('a') // 1

function minimumCost(arr) {
	const moveRight = (rowI, i) => arr[rowI][i + 1];
	const moveDown = (rowI, i) => (arr[rowI + 1] ? arr[rowI + 1][i] : undefined);
	let rowI = 0;
	let elI = 0;
	let cost = arr[rowI][elI];

	let right = moveRight(rowI, elI);
	let down = moveDown(rowI, elI);

	while (!isNaN(right) || !isNaN(down)) {
		if (isNaN(down) || right <= down) {
			cost += right;
			elI += 1;
		} else {
			cost += down;
			rowI += 1;
		}

		right = moveRight(rowI, elI);
		down = moveDown(rowI, elI);
	}
	console.log('cost: ', cost);
	return cost;
}

minimumCost([
	[4, 2, 1],
	[1, 1, 1],
	[3, 2, 4],
]); // 11
minimumCost([
	[1, 10, 5, 3],
	[2, 6, 1, 5],
	[9, 2, 8, 1],
	[1, 3, 1, 6],
]); // 22

// TODO: Investigate implementation
// function minimumCost(arr) {
//   const minimumCostToCell = (m,n) => {
//     if (m < 0 || n < 0) return Infinity;
//     if (m == 0 && n == 0) {
//         return arr[m][n];
//     }

//     return arr[m][n] + Math.min(
//         minimumCostToCell(m-1, n),
//         minimumCostToCell(m, n-1)
//       )
//   }

//   return minimumCostToCell(arr.length-1, arr[0].length-1)
// }

function arrayManipulation(n, queries) {
	let arr = Array(n).fill(0);

	queries.forEach(([a, b, k]) => {
		const first = Math.max(a - 1, 0);
		arr = [
			...arr.slice(0, first),
			...arr.slice(first, b).map((el) => (el += k)),
			...arr.slice(b),
		];
	});

	return Math.max(...arr);
}

const n = 5;
const queries = [
	[1, 2, 100],
	[2, 5, 100],
	[3, 4, 100],
];
console.log(arrayManipulation(n, queries)); // Output: 200

/**
 * Given is an array words with words.
 * Return the longest word of the array.
 * Return 'Foobar' if the two longest words have the same length.
 *
 **/

function longestWord(words) {
	let nLength = 0;
	let nWordsArr = [];

	words.forEach((word) => {
		if (word.length === nLength) {
			nWordsArr.push(word);
		}

		if (word.length > nLength) {
			nLength = word.length;
			nWordsArr = [word];
		}
	});

	return nWordsArr.length > 1 ? 'Foobar' : nWordsArr[0];
}

function longestWord_1(words) {
	const maxLength = Math.max(...words.map((word) => word.length));

	return words.reduce((acc, word) => {
		if (word.length !== maxLength) return acc;

		return acc ? 'Foobar' : word;
	}, '');
}

function longestWord_2(words) {
	let maxLength = 0;

	return words.reduce((acc, word) => {
		if (word.length >= maxLength) {
			acc = word.length === maxLength ? 'Foobar' : word;
			maxLength = word.length;
		}

		return acc;
	}, '');
}

console.log(longestWord_2(['You', 'are', 'great']));
console.log(longestWord_2(['You', 'are', 'very', 'beautiful']));

function uniquePalindromeSubstrings(str) {
	const strArr = str.split('');
	const palindromeArr = [];

	const uniquePal = str
		.split('')
		.reduce((acc, curr, index) => {
			for (i = index + 1; i <= str.length; i++) {
				const subStr = str.slice(index, i);
				if (subStr.split('').reverse().join('') === subStr) acc.push(subStr);
			}

			return acc;
		}, [])
		.sort();

	return [...new Set(uniquePal)];
}

console.log(uniquePalindromeSubstrings('maoam'));

function either404A(numbers) {
	return numbers.reduce((acc, curr, i) => {
		if (i === 0 || (curr !== 0 && curr !== 4)) return acc;
		if (curr === numbers[i - 1]) acc = !acc;
		return acc;
	}, false);
}

function either404B(numbers) {
	const numStr = numbers.join('');
	const isZero = numStr.includes('00');
	const isFour = numStr.includes('44');

	return (isZero || isFour) && !(isZero && isFour);
}

console.log(either404A([4, 3, 1]), either404B([4, 3, 1])); // false
console.log(either404A([2, 8, 4, 4]), either404B([2, 8, 4, 4])); // true
console.log(either404A([0, 0, 3, 6, 4, 4]), either404B([0, 0, 3, 6, 4, 4])); // false

// divisible by three with "Fizz"
// divisible by five with "Buzz"
// divisible by five and three replace it by "FizzBuzz"
// number
function fizzBuzz(start, end) {
	const values = [];
	for (let val = start; val <= end; val++) {
		let str = '';
		if (val % 3 === 0) str += 'Fizz';
		if (val % 5 === 0) str += 'Buzz';
		values.push(str || val.toString());
	}

	return values;
}

console.log(fizzBuzz(1, 5));
console.log(fizzBuzz(3, 16));
console.log('\n');

function findPairs(arr, target) {
	return arr.sort().reduce((acc, num, i) => {
		for (let idx = i + 1; idx < arr.length; idx++) {
			if (num + arr[idx] === target) acc.push([num, arr[idx]]);
		}

		return acc;
	}, []);
}

console.log(findPairs([1, 2, 3, 4, 5], 5));
console.log(findPairs([3, 7, 8, 4, 5, 9], 12));
console.log('\n');

/* A String string is given. 
	Return the number of the word "Me" in this string. 
	Count 'Me' only if none 'x' is anywhere in front of it.
*/
function countMe(string) {
	let idx = string.lastIndexOf('Me');
	let count = 0;

	while (idx >= 0) {
		const subStr = string.substring(0, idx);
		count = idx === 0 || !subStr.includes('x') ? (count += 1) : count;
		idx = subStr.lastIndexOf('Me');
	}
	console.log('Result: ', count);
	return count;
}

countMe('Meishere');
countMe('thisisxMe');
countMe('xMeisxMe');
countMe('MeixsyouMe');

function timeConvert(minutes) {
	const hours = String(parseInt(minutes / 60)).padStart(2, '0');
	const min = String(minutes % 60).padStart(2, '0');
	const time = `${hours}:${min}`;
	console.log(time);

	return time;
}

timeConvert(1000); // '16:40'
timeConvert(59); // '00:59'
timeConvert(61); // '01:01'
timeConvert(1440); //'24:00'
timeConvert(0); // '00:00'
timeConvert(34303); // '571:43'

function reverseNumber(n) {
	return Math.sign(n) * Math.abs(n).toString().split('').reverse().join('');
}

reverseNumber(123); // 321
reverseNumber(-123); // -321
reverseNumber(1000); // 1

class PaginationHelper {
	constructor(collection, itemsPerPage) {
		// The constructor takes in an array of items and a integer indicating how many
		// items fit within a single page
		this.collection = collection;
		this.itemsPerPage = itemsPerPage;
	}
	itemCount() {
		// returns the number of items within the entire collection
		return this.collection.length;
	}
	pageCount() {
		// returns the number of pages
		return Math.ceil(this.collection.length / this.itemsPerPage);
	}
	pageItemCount(pageIndex) {
		// returns the number of items on the current page. page_index is zero based.
		// this method should return -1 for pageIndex values that are out of range
		const pageCount = this.pageCount();
		if (pageIndex < 0 || pageIndex >= pageCount) return -1; // pageIndex out of range

		const startIndex = pageIndex * this.itemsPerPage;
		const remainingItems = this.collection.length - startIndex;
		return Math.min(remainingItems, this.itemsPerPage);
	}
	pageIndex(itemIndex) {
		// determines what page an item is on. Zero based indexes
		// this method should return -1 for itemIndex values that are out of range
		if (itemIndex < 0 || itemIndex >= this.collection.length) return -1; // itemIndex out of range
		return Math.floor(itemIndex / this.itemsPerPage);
	}
}

const collection = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];
const helper = new PaginationHelper(collection, 10);

console.log(helper.pageCount());
console.log(helper.itemCount());
console.log(helper.pageItemCount(1)); // 10

const obj1 = {
	site: 'Codewars',
	description: 'Lorem ipsum dolor sit...',
	obj2: {
		str: 'Yeah, Codewars!',
		num: 123,
		obj3: {
			something:
				"Ph'nglui mglw'nafh Codewars R'lyeh wgah'nagl fhtagn. Gotha fm'latgh h'gof'nn, geb chtenff",
		},
	},
};

const obj2 = {
	site: 'Codewars',
	description: 'Lorem ipsum dolor sit...',
	obj2: {
		str: 'Yeah, Codewars!',
		num: 123,
		obj3: {
			something:
				"Ph'nglui mglw'nafh Codewars R'lyeh wgah'nagl fhtagn. Gotha fm'latgh h'gof'nn, geb chtenff",
		},
	},
	surprise: 'Ha! Codewars :)',
	nullProperty: null,
};

function searchString(obj, search) {
	let result = [];

	for (let key in obj) {
		const value = obj[key];
		if (typeof value === 'string' && value.includes(search))
			result.push(key.toString());

		if (value && typeof value === 'object') {
			result = result.concat(
				searchString(value, search).map((k) => `${key}.${k}`)
			);
		}
	}

	return result.sort();
}

const results = searchString(obj1, 'Codewars'); // results = ["obj2.obj3.something", "obj2.str", "site"]
const results2 = searchString(obj2, 'Codewars'); // ["obj2.obj3.something", "obj2.str", "site", "surprise"]
console.log('\n Result: ', results2);

function getWowelCount(str) {
	return (str.match(/[aeiou]/gi) || []).length;
}

console.log('\ngetWowelCount: ', getWowelCount('abracadabra'));
console.log('\ngetWowelCount: ', getWowelCount('pear tree'));

function highAndLow(paramStr) {
	const numList = paramStr.split(' ').map(Number);
	return `${Math.max(...numList)} ${Math.min(...numList)}`;
}
console.log(highAndLow('1 2 3 4 5')); // return "5 1"
console.log(highAndLow('1 2 -3 4 5')); // return "5 -3"
console.log(highAndLow('1 9 3 4 -5')); // return "9 -5"

function createPhoneNumber(numbers) {
	const str = numbers.join('');
	return `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`;
	// return numbers.join('').replace(/(...)(...)(.*)/, '($1) $2-$3');
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])); // => returns "(123) 456-7890"
console.log('\n');

function isValidWalk(walk) {
	// 10min
	if (walk.length !== 10) return false;
	// returning to the same direction:
	// north === south &&
	// east steps === west
	// const north = walk.reduce((acc, dir) => dir === 'n' ? acc+=1 : acc, 0);
	// const south = walk.reduce((acc, dir) => dir === 's' ? acc+=1 : acc, 0);
	// const east = walk.reduce((acc, dir) => dir === 'e' ? acc+=1 : acc, 0);
	// const west = walk.reduce((acc, dir) => dir === 'w' ? acc+=1 : acc, 0);
	const north = walk.filter((dir) => dir === 'n').length;
	const south = walk.filter((dir) => dir === 's').length;
	const east = walk.filter((dir) => dir === 'e').length;
	const west = walk.filter((dir) => dir === 'w').length;

	return north === south && east === west;
}

console.log(isValidWalk(['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's'])); // true
console.log(
	isValidWalk(['w', 'e', 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e', 'w', 'e'])
); // false
console.log(isValidWalk(['w'])); // false
console.log(isValidWalk(['n', 'n', 'n', 's', 'n', 's', 'n', 's', 'n', 's'])); // false
console.log('\n');

var number = function (busStops) {
	// Good Luck!
	return busStops.reduce((acc, [on, off]) => {
		return acc + on - off;
	}, 0);
};

console.log(
	number([
		[10, 0],
		[3, 5],
		[5, 8],
	]),
	'\n'
);

function findOutlier(integers) {
	const even = integers.slice(0, 3).filter((n) => n % 2 === 0);
	const odd = integers.slice(0, 3).filter((n) => n % 2 !== 0);

	return even.length > odd.length
		? integers.find((n) => n % 2 !== 0)
		: integers.find((n) => n % 2 === 0);
}
console.log('\nfindOutlier: ');
console.log(findOutlier([0, 1, 2]), 1);
console.log(findOutlier([1, 2, 3]), 2);
console.log(findOutlier([2, 6, 8, 10, 3]), 3);
console.log(findOutlier([0, 0, 3, 0, 0]), 3);

function queueTime(customers, treads) {
	if (customers.length && customers.length <= treads) return Math.max(...customers);

	const tillsList = new Array(treads).fill(0);
	customers.forEach((time) => {
		const freeTillIdx = tillsList.indexOf(Math.min(...tillsList));
		tillsList[freeTillIdx] += time;
	})

	return Math.max(...tillsList)
}

console.log('\nqueueTime: \n');
console.log(queueTime([], 1), 0);
console.log(queueTime([1, 2, 3, 4], 1), 10);
console.log(queueTime([2, 2, 3, 3, 4, 4], 2), 9);
console.log(queueTime([1, 2, 3, 4, 5], 100), 5);
console.log(queueTime([5, 3, 4], 1), 12);
console.log(queueTime([10, 2, 3, 3], 2), 10);
console.log(queueTime([2, 3, 10, 2], 2), 12);

console.log('\nsortArray: ')
// sort the odd numbers in ascending order while leaving the even numbers at their original positions
function sortArrayOddDraft(array) {
  let idx = 0;
  
  while (idx < array.length) {
    const value = array[idx];

		if (value % 2 == 0) {
			console.log(`Even: ++ and continue`)
      idx++;
      continue;
    }

		const lessIdx = array.findIndex((num, i) => {
			return !!(num % 2) && i > idx && num < value
		});
		
		if (lessIdx > 0) {
			array[idx] = array[lessIdx];
			array[lessIdx] = value;
			continue;
		}

		idx++;
  }

	return array
}

function sortArrayOdd(array) {
	const odds = array.filter(num => num%2).sort((a, b) => a - b);
	return array.map(num => num%2 ? odds.shift() : num);
}

console.log(sortArrayOdd([5, 3, 2, 8, 1, 4]), [1, 3, 2, 8, 5, 4]);
console.log(sortArrayOdd([5, 3, 1, 8, 0]), [1, 3, 5, 8, 0]);
console.log(sortArrayOdd([]), []);
