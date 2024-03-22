/** program that declares a variable 'result' that can hold
 * either a 'string' or a 'number'.
 * Now write a function that takes an argument of type 'string | number | boolean'
 * and logs its type.*/
let result: string | number | boolean;

function logType(arg: string | number | boolean): void {
	if (typeof arg === 'string') {
		console.log('Type: string');
	} else if (typeof arg === 'number') {
		console.log('Type: number');
	} else if (typeof arg === 'boolean') {
		console.log('Type: boolean');
	} else {
		console.log('Type: unknown');
	}
}

result = 'TypeScript ';
logType(result);

// 2. union type
interface Car {
	make: string;
	model: string;
}

type Bus = {
	make: string;
	model: string;
	payloadCapacity: number;
};

type Vehicle = Car | Bus;
const car: Car = { make: 'Audi', model: 'A4' };
const bus: Bus = { make: 'Vovo', model: 'XC60', payloadCapacity: 20 };
const vehicles: Vehicle[] = [car, bus];

// type assertion
const mixedData: (number | string | boolean)[] = [
	-12,
	'one',
	10,
	false,
	'two',
	34,
	true,
	'three',
];
console.log('Original array elements:', mixedData);
const numbersOnly: number[] = mixedData.filter(
	(item): item is number => typeof item === 'number'
);
console.log('Numbers Only:', numbersOnly);
const booleanOnly: boolean[] = mixedData.filter(
	(item): item is boolean => typeof item === 'boolean'
);
console.log('Boolean Only:', booleanOnly);

type CookieSurveyInput<T extends Record<string, number>> = keyof T;

type Address = { address: string; city: string };
type PresentDeliveryList<T> = Record<keyof T, Address>;

type SantasList<
	Bads extends readonly unknown[],
	Goods extends readonly unknown[]
> = [...Bads, ...Goods];

// tuple
const coordinates: [number, number] = [10, 20];

let personDetails: Record<string, any> = {
	name: 'John',
	age: 25,
	isStudent: true,
};

// type alias
type carType = string;

// generics
function createPair<typeX, typeY>(x: typeX, y: typeY): [typeX, typeY] {
	return [x, y];
}
console.log(createPair<string, number>('Meaning', 42));

// Utility types
// Record<string, number> is equivalent to { [key: string]: number }
interface Person {
	age: number;
	firstName: string;
	lastName: string;
}

let kindPerson: Partial<Person> = {};
let kindPerson2: Required<Person> = {
	age: 1800,
	firstName: 'Santa',
	lastName: 'Claus',
};
