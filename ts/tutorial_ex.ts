// https://learntypescript.dev/06/intro
(() => {
	// MOCK Document to use in node console
	const document = {
		getElementById: (id: string) => ({}),
		querySelector: (id: string) => ({}),
	};

	//? TYPE INFERENCE
	let dateOfBirth: Date = new Date(1990, 4, 7);
	console.log(dateOfBirth instanceof Date);
	console.log(dateOfBirth.getDate());

	function calculateRenewal(startDate: Date): Date {
		const result = new Date(startDate);
		result.setDate(result.getDate() + 30);
		return result;
	}

	const numbers: Array<number> = [1, 4, 7];
	console.log(numbers);

	function logScores(firstName: string, ...scores: (string | number)[]) {
		console.log(firstName, scores);
	}
	logScores('Ben', 50, 75, '65');

	const point = { x: 32, y: 77 };
	point.x = 40;
	point.y = 80;
	// point.z = 10; //!💥 error

	//? TUPLES
	const tomScore1: [string, number] = ['Tom', 70];
	// Labelling tuples
	const tomScore2: [name: string, score: number] = ['Tom', 70];
	// open-ended tuples (have some structure, but the number of elements isn't fixed)
	const fredScores: [name: string, ...scores: number[]] = ['Fred', 70, 60, 80];

	//? NEVER type (code should never be reached; this type doesn't contain any values and can be thought of as an empty set)
	//* void is when the function returns without a value. In this example, the function never returns
	const keepLogging = (message: string): never => {
		while (true) {
			console.log(message);
		}
	};

	function outputMessage(message: string) {
		if (typeof message === 'string') {
			console.log(message);
		} else {
			let invalid: never = message;
			console.error(invalid);
		}
	}

	//? UNKNOWN vs. ANY type (The 'unknown' contains all the possible values, but strict, 'any' not type checked)
	const add1 = (a: any, b: any) => a + b; //😊 no error
	// const add2 = (a: unknown, b: unknown) => a + b; //!💥 error: math is not allowed on any value
	// fix error with type guard:
	const add = (a: unknown, b: unknown): number => {
		if (typeof a === 'number' && typeof b === 'number') {
			return a + b;
		}
		return 0;
	};

	//? TYPE PREDICATE [param is Type]
	function isPerson(person: any): person is Person {
		return 'id' in person && 'name' in person;
	}

	async function getData(path: string): Promise<unknown> {
		const response = await fetch(path);
		return await response.json();
	}
	type Person = {
		id: string;
		name: string;
	};
	async function getPerson(id: string): Promise<Person | null> {
		const person = await getData('/people/1');
		// if (person) return person; //!💥 Error
		if (person && isPerson(person)) return person; //😊 Fixed with type predicate
		return null;
	}

	//? ENUMS
	enum NumericLevel {
		High,
		Medium,
		Low,
	}
	let numLevel: NumericLevel;
	// numLevel = 5; //!💥 error
	numLevel = 0; //😊 no error
	numLevel = NumericLevel.Medium; //😊 no error

	//* String enum values are strongly-typed to the named values declared in the enum
	enum StringLevel {
		High = 'H',
		Medium = 'M',
		Low = 'L',
	}

	let level: StringLevel;
	// level = 'JK' //!💥 error
	// level = 'H' //!💥 error
	level = StringLevel.High; //😊 no error

	//? TYPE ALIASES
	//* for primitives [type TypeAliasName = ExistingType]
	type FirstName = string;
	type PersonScore = number;
	let firstName: FirstName = 'Tom';
	let personScore: PersonScore = 70;
	//* for functions: [type TypeAliasName = (paramName1: paramType1, ...) => ReturnType]
	type Log = (message: string, category?: string) => void;

	const log: Log = (message: string) => {
		console.log(message);
	};
	log('Hello');
	// also possible with interfaces
	interface LogTwo {
		(message: string): void;
	}

	//* for objects:
	type Score = {
		name: string;
		score: number;
		log: Log;
		pass?: boolean;
	};
	const tomScore: Score = {
		name: 'Tom',
		score: 70,
		pass: true,
		log,
	};
	const bobScore: Score = {
		name: 'Bob',
		score: 80,
		log,
	};
	console.log(tomScore, bobScore);

	//? UNION TYPES [ type A_or_B_or_C = A | B | C ]
	type Age = number | null | undefined;
	let age: Age;

	//* string literal union types
	type Fruit = 'Banana' | 'Apple' | 'Pear';
	let fruit: Fruit;
	// fruit = 'pear'; //!💥 error
	// fruit = 'strawberry'; //!💥 error
	fruit = 'Apple';

	//* Object union types
	type Actions =
		| { type: 'loading' }
		| { type: 'loaded'; data: { name: string } };
	let loadingAction: Actions;
	// loadingAction = { type: 'error' }; //!💥 error
	loadingAction = { type: 'loading' }; //😊 no error

	//? INTERSECTION TYPES [ type A_and_B_and_C = A & B & C ]
	type Name = {
		firstName: string;
		lastName: string;
	};
	type PhoneNumber = {
		landline: string;
		mobile: string;
	};

	type Email = {
		emailAddress: string;
	};

	type ContactData = Name & PhoneNumber & Email;

	const fred: ContactData = {
		firstName: 'Fred',
		lastName: 'Smith',
		landline: '0116 4238978',
		mobile: '079543 4355435',
		emailAddress: 'email@com',
	};

	// Intersection of common members
	type BaseElement = {
		name: string;
		kind: 'text' | 'number' | 'email';
	};
	type TextInput = {
		kind: 'text';
	};
	type Field = BaseElement & TextInput;
	const age1: Field = {
		name: 'Age',
		// kind: 'number', //!💥 error, mathematically intersected
		kind: 'text', //😊 no error
	};

	type A = {
		doIt: (a: string) => void;
	};
	type B = {
		doIt: (a: string, b: string) => void;
	};
	type A_and_B = A & B;

	const ab_v2: A_and_B = {
		doIt: (a: string) => {}, //😊 no error
		// doIt: (a: string, b: string) => {},  //!💥 error, mathematically intersected
	};

	type OrderStatus = 'pending' | 'completed';
	type DeliveryStatus = 'completed' | 'shipped';
	// will contain 'pending', 'completed', and 'shipped':
	type StatusUnion = OrderStatus | DeliveryStatus;
	// will just contain 'completed' because we take the values where the OrderStatus and DeliveryStatus sets intersect
	type StatusIntersection = OrderStatus & DeliveryStatus;

	//? CLASSES
	class Product {
		// private name: string;
		// readonly price: number;
		constructor(public name: string, readonly price: number) {
			this.name = name;
			this.price = price;
		}

		log() {
			console.log(this.name, this.price);
		}

		copy(name: string) {
			const copiedProduct = new Product(name, this.price);
			return copiedProduct;
		}

		static equal(product1: Product, product2: Product): boolean {
			return (
				product1.name === product2.name && product1.price === product2.price
			);
		}
	}

	// table1.price = 500; //!💥 error: readonly property OR (if private -> not accessible by the consumer of the class)
	const table1 = new Product('Table 1', 300);
	const table2 = table1.copy('Table 2');
	console.log(Product.equal(table1, table2));

	//* CLASSES: method overloading
	class Products {
		private products: Product[] = [];

		add(product: Product) {
			this.products.push(product);
		}
		// method overloading implementation:
		/* The overload signatures need to fit into the implementation signature. 
			This generally means that some of the implementation signature parameters need to be optional. (price) 
		*/
		filter(name: string): Product[]; // overload signature
		filter(name: string, price: number): Product[]; // overload signature
		filter(name: string, price?: number): Product[] {
			// last is implementation signature
			if (price === undefined) {
				return this.products.filter((product) => product.name === name);
			} else {
				return this.products.filter(
					(product) => product.name === name && product.price === price
				);
			}
		}
	}

	const products = new Products();
	products.add(new Product('Table', 400));
	products.add(new Product('Chair', 100));
	products.add(new Product('Lamp', 30));

	console.log(products.filter('Chair'));
	console.log(products.filter('Table', 400));

	//* CLASSES: Extending
	class Table extends Product {
		constructor(
			public name: string,
			public price: number,
			public legs: number
		) {
			super(name, price);
		}

		log() {
			console.log('Overritten method: ', this.name, this.price, this.legs);
		}
	}

	const table = new Table('Table', 400, 4);
	table.log();

	//* CLASSES: Abstract (low-level classes, when we don't want consumers to create instances of a class)
	abstract class Animal {
		constructor(public name: string) {}
		protected log(message: string) {
			console.log(message);
		}
	}
	class Dog extends Animal {
		bark() {
			this.log(this.name + ' Bark');
		}
	}
	// const animal = new Animal('Lord');  //!💥 error: abstract classes could not be instantiated
	const dog = new Dog('Fudge');
	dog.bark();

	//? GENERICS [const myVar = GenericType<SpecificType1, SpecificType2, ...>]
	let scores = [70, 65, 75];
	// scores = [70, '65', 75]; //!💥 error for '65': TS picks up the type
	type Coordinate = [number, number];
	let coordinates: Array<Coordinate>;
	coordinates = [
		// [30, 100, 0], //! error for 0
		[30, 100],
		[100, 50],
	];
	console.log('Array<Coordinate>: ', coordinates);
	// Response type
	const promisedResponse: Promise<Response> = fetch('https://swapi.dev/api/');
	promisedResponse.then((res: Response) => console.log(res.ok));

	//* GENERICS: Objects
	//* Record<K,V>
	/* The Record generic type allows a key-value object type to be created */
	type Result = {
		firstName: string;
		surname: string;
		score: number;
	};
	//* with key is any string, and the value is of type Result:
	// ResultRecord type ResultRecord = Record<string, Result>;
	//* with key narrowing:
	type ResultRecord = Record<'rodj' | 'janes' | 'fredp', Result>;

	const records: ResultRecord = {
		rodj: {
			firstName: 'Rod',
			surname: 'James',
			score: 70,
		},
		janes: {
			firstName: 'Jane',
			surname: 'Smith',
			score: 95,
		},
		fredp: {
			firstName: 'Fred',
			surname: 'Peters',
			score: 60,
		},
	};
	console.log(records);

	//* GENERICS: Functions
	//* function someFunc<T1, T2, ...>(...) {...}
	// function firstOrNull(array: string[]): string | null {
	// 	return array.length === 0 ? null : array[0];
	// }

	function firstOrNull<T>(array: T[]): T | null {
		return array.length === 0 ? null : array[0];
	}

	firstOrNull<string>(['Rod', 'Jane', 'Fred']);
	firstOrNull<number>([1, 2, 3]);
	const firstN = firstOrNull([1, 2, 3]); // return type is number | null
	const firstS = firstOrNull(['Rod', 'Jane', 'Fred']); // return type is string | null
	console.log(firstN, firstS);

	//* GENERICS: Interfaces
	//* interface InterfaceName<T1, T2, ...> {...}
	interface Contact {
		name: string;
		email: string;
	}

	interface ContactForm<T> {
		values: T;
		errors: {
			[K in keyof T]?: string;
		};
	}
	// [K in keyof T] will put all the keys in the type T into a string literal union
	// 'name' | 'email', { name?: string; email?: string }
	const contactForm: ContactForm<Contact> = {
		values: {
			name: 'Bob',
			email: 'bob@someemail.com',
		},
		errors: {
			// 'age': 'some error', //!💥 error: no such key in T
			name: 'wrong length',
		},
	};

	//* GENERICS: Type Aliases
	//* type TypeName<T1, T2, ...> = { ... }
	/** members of the type can reference the generic types passed into it */
	type Form<T> = {
		values: T;
		errors: { [K in keyof T]?: string };
	};

	//* GENERICS: Classes
	//* class ClassName<T1, T2, ...> { ... }
	class List<T> {
		private items: T[] = [];

		add(item: T) {
			this.items.push(item);
		}
	}
	const numberList = new List<number>();
	const numberList2 = new List<string>();
	numberList.add(1);
	// numberList.add('2'); //!💥 error for T as <number>
	numberList2.add('2'); //😊 no error for <string>

	//* GENERICS: Parameter Defaults
	//* <T = DefaultType>
	//** Generic parameter defaults can be added to functions, interfaces, type aliases, and classes. */

	interface Component<T1 = string, T2 = unknown> {
		name: T1;
		props: T2;
		log: () => void;
	}

	const button: Component = {
		name: 'Button',
		props: {
			text: 'Save',
		},
		log: () => console.log('Save button'),
	};

	const firstOrUndefined = <T = string>(array: T[]): T | undefined => {
		return array.length === 0 ? undefined : array[0];
	};
	// default generic parameter type was overridden by the type inference of the function parameters:
	const first = firstOrUndefined([1, 2, 3]);
	console.log(first);

	//* GENERICS: Parameter Constraints
	//* <T extends ContrainingType>
	interface Logable {
		log: () => void;
	}
	function logItems<T extends Logable>(items: T[]): void {
		items.forEach((item) => item.log());
	}
	// all elements should contain log() method now:
	const headingEl = {
		name: 'Heading',
		props: { text: 'Chapter 1' },
		log: () => console.log('Chapter 1 heading'),
	};
	const buttonEl = {
		name: 'Button',
		props: { text: 'Save' },
		trace: () => console.log('Save button'),
		log: () => console.log('Save button'),
	};
	logItems([headingEl, buttonEl]);

	interface FormEl<T> {
		values: T;
	}

	//!💥 error for getting fieldName, TS doesn't know what the structure of value
	// const getFieldValue = <T>(form: FormEl<T>, fieldName: string) => {
	//😊 no error: TS 'keyof' keyword queries the keys of the type referenced after it
	const getFieldValue = <T, K extends keyof T>(
		form: FormEl<T>,
		fieldName: K
	) => {
		return form.values[fieldName];
	};
	console.log(getFieldValue(contactForm, 'name'));
	// console.log(getFieldValue(contactForm, 'phone')); //!💥 error: 'phone' is not 'keyof Contact'

	//* GENERICS: Rest Elements with Tuple Types
	type Scores = [string, ...number[]];
	type NameAndThings<T extends unknown[]> = [name: string, ...things: T];

	let bobScores: NameAndThings<number[]>;
	bobScores = ['Bob', 4, 9, 3];
	// bobScores = ['Bob', 4, '9', 3]; //!💥 error: '9' is a string rather than a number which the type expects
	let bobGrades: NameAndThings<('A' | 'B' | 'C')[]>;
	bobGrades = ['Bill', 'A', 'B', 'C'];

	function logThings<T extends unknown[]>(name: string, ...things: T) {
		console.log(things);
	}

	logThings('Bob', 4, 9, 3);
	logThings('Bob', 4, '9', 3); // TS infers the generic parameter type to be [number, string, number]
	// logThings<number[]>('Bob', 4, '9', 3); //!💥 error for '9' is not number

	//* GENERICS: Spreading generic tuple parameters
	function merge(names: string[], scores: number[]) {
		return [...names, ...scores];
	}
	// generic parameter type called Names that is an array of strings etc.
	function mergeNarrowed<Names extends string[], Scores extends number[]>(
		names: [...Names],
		scores: [...Scores]
	): [...Names, ...Scores] {
		return [...names, ...scores];
	}
	// inferred type of scores: (string | number)[]
	let scoresData = merge(['Bill', 'Jane'], [8, 9]);
	// inferred type of scores: ('Bill' | 'Jane' | 8 | 9)[]
	scoresData = mergeNarrowed(['Bill', 'Jane'], [8, 9]);

	//? TYPE NARROWING
	//* variable can move from a less precise type to a more precise type
	type BigAnimal = {
		name: string;
		legs?: number;
	};
	function addLeg(animal: BigAnimal) {
		// animal.legs = animal.legs + 1; //!💥 - Object is possibly 'undefined'
	}

	//* TYPE NARROWING: type assertions to narrow the type
	//* <TypeName>expression;
	//* expression as TypeName;
	let buttonGo = document.querySelector('.go'); // by default type: Element | null
	// if (buttonGo) buttonGo.disabled = true; //!💥 error: no 'disabled' on Element
	//😊 no error: no HTMLButtonElement type:
	const buttonGo_1 = <HTMLButtonElement>document.querySelector('.go');
	if (buttonGo_1) buttonGo_1.disabled = true;
	const buttonGo_2 = document.querySelector('.go') as HTMLButtonElement;
	if (buttonGo_2) buttonGo_2.disabled = true;

	//* TYPE NARROWING: non-null assertion operator (!)
	//* should only use this when we definitely know the variable or expression can't be null or undefined
	function duplicate(text: string | null) {
		let fixString = () => {
			if (text === null || text === undefined) text = '';
		};
		fixString();

		// return text.concat(text); //!💥 error: text could be null
		return text!.concat(text!); //😊 no error: using (!) - non-null assertion
	}
	console.log(duplicate('hello'));

	//* TYPE NARROWING: a `typeof` type guard
	//* when checking against primitive types
	function double(item: string | number) {
		// TODO - return `item.concat(item)` if item is a string
		// TODO - return `item + item` if item is a number
		if (typeof item === 'string') return `item.concat(item)`;
		else return `item + item`;
	}
	console.log(double('hello'));
	console.log(double(1));

	//* TYPE NARROWING: an `instanceof` type guard
	//* narrow the type of a class object variable
	//* [objectVariable instanceof ClassName]
	class ContactClass {
		constructor(public emailAddress: string) {}
	}
	class Manager extends ContactClass {
		constructor(
			public firstName: string,
			public surname: string,
			emailAddress: string
		) {
			super(emailAddress);
		}
	}
	class Organisation extends ContactClass {
		constructor(public name: string, emailAddress: string) {
			super(emailAddress);
		}
	}

	function sayHello(contact: ContactClass) {
		// TODO - Output Hello {firstName} if a manager
		// TODO - Output Hello {name} if an organisation
		if (contact instanceof Manager) console.log(`Hello ${contact.firstName}`);
		else if (contact instanceof Organisation)
			console.log(`Hello ${contact.name}`);
	}

	//* TYPE NARROWING: an `in` type guard
	//* to check whether a property belongs to a particular object
	//* more useful than instanceof because it can be applied to any object structure
	//* [ propertyName in objectVariable ]
	interface NewManager {
		firstName: string;
		surname: string;
	}
	interface NewOrganisation {
		name: string;
	}
	type NewContact = NewManager | NewOrganisation;

	function sayHelloToNew(contact: NewContact) {
		// TODO - Output Hello {firstName} if a person
		// TODO - Output Hello {name} if an organisation
		if ('firstName' in contact) console.log(`Hello ${contact.firstName}`);
		if ('name' in contact) console.log(`Hello ${contact.name}`);
	}
	const bob: NewManager = {
		firstName: 'Bob',
		surname: 'Young',
	};
	const redBricks: NewOrganisation = { name: 'Red Bricks' };
	sayHelloToNew(bob);
	sayHelloToNew(redBricks);

	//* TYPE NARROWING: user-defined type guard with a type predicate
	//* [ paramName is NarrowTypeName ]
	(function() {
		interface Person {
			firstName: string;
			surname: string;
		}
		interface Organisation {
			name: string;
		}

		type Contact = Person | Organisation;
		const isPerson = (contact: Contact): contact is Person => {
			return contact.hasOwnProperty(firstName)
		}

		const isOrganisation = (contact: Contact): contact is Organisation => {
			return (contact as Organisation).name !== undefined;
		}
		
		function sayHello(contact: Contact) {
			// TODO - Output Hello {firstName} if a person
			if (isPerson(contact)) {
				console.log("Hello " + contact.firstName);
			}
			// TODO - Output Hello {name} if an organisation
			if (isOrganisation(contact)) {
				console.log("Hello " + contact.name);
			}
		}
		
		const bob: Person = {
			firstName: "Bob",
			surname: "Young"
		};
		
		const redBricks: Organisation = {
			name: "Red Bricks"
		};
		
		sayHello(bob);
		sayHello(redBricks);
	})()


	// TUTORIAL END
})();

(function () {
	enum AGE {
		CHILD,
		TEENAGER,
		ADULT,
	}
	let ageKey: string = AGE[2];
	let ageValue: AGE = AGE.ADULT;
	console.log('AGE reverse mapping: ', ageKey, ageValue);
	console.log(AGE[AGE.CHILD]); // "CHILD"
	console.log(AGE[AGE.TEENAGER]); // "TEENAGER"
	console.log(AGE[AGE.ADULT]); // "ADULT"

	console.log(
		'\n heterogeneous enums that allows to mix numeric and string-based values'
	);
	enum ANSWER {
		YES = 'yes',
		NO = 0,
	}
	console.log(ANSWER.YES); // "yes"
	console.log(ANSWER.NO); // 0


})();

// QUESTIONS TO DISCOVER:
// - when to use never type
// - type vs. interface vs. class
// - String literal unions vs. string enums
// - when to use method overloading in projects
// - using keyof vs. 'keyof typeof'
