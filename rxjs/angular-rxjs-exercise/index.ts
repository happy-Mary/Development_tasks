// https://stackblitz.com/edit/angular-rxjs-exercise-solution?file=index.ts

import { combineLatest, merge, race, interval, concat, zip, timer } from 'rxjs';
import {
	filter,
	distinct,
	skipUntil,
	map,
	first,
	distinctUntilChanged,
	skip,
	take,
	tap,
	delay,
	debounceTime,
	mergeMap,
  startWith,
  takeUntil,
} from 'rxjs/operators';

import { Car } from './types/car.type';
import { Truck } from './types/truck.type';
import { cars$, trucks$, runDataStream } from './data.stream';

// EXERCISES
//* #1 ---
//* step 1: only get cars that have the 'color' black or red
//* step 2: only get the 'color' of the car
//* step 3: only emit a new value when the value is different from the previous one

cars$.pipe(
  filter((car: Car) => ['red', 'black'].includes(car.color)),
  map(({ id, color }: Car): { color: string, id: string } => ({ id, color })),
  distinctUntilChanged((prev: any, curr: any) => prev.color === curr.color)
)
// .subscribe(value => console.log('#1: ', value));

//* #2 ---
//* step 1: skip the first 3 cars from the stream
//* step 2: take only the first 5 cars from the stream, ignore all the others
cars$.pipe(
  skip(3),
  take(5)
)
// .subscribe((value: Car) => console.log('#2: ',value));

//* #3 ---
//* step 1: only get the cars with the 'color' blue
//* step 2: console log the cars inside the stream
//* step 3: delay the emit of the values by 500ms
cars$.pipe(
  filter(car => car.color === 'blue'),
  tap(car => console.log(car)),
  delay(500),
)
// .subscribe(value => console.log('#3: ', value.id));

//* #4 ---
//* step 1: only get the 'make' of the car
//* step 2: only emit a new value when there hasn't been any activity on the stream for at least 500ms
cars$.pipe(
  map(car => car.make),
  debounceTime(500)
)
// .subscribe(value => console.log('#4: ', value));

//* #5 ---
//* step 1: combine all cars with all trucks (don't use the 'merge' operator)
combineLatest([cars$, trucks$])
// .subscribe(
//   ([car, track]) => console.log(`#5: \ncar: ${JSON.stringify(car)},\ntrack: ${JSON.stringify(track)}`)
// );

//* #6 ---
//* step 1: merge all cars with all trucks (don't use the 'combineLatest' operator)
merge(cars$, trucks$)
// .subscribe(value => console.log('#6: ', value))

//* #7 ---
//* step 1: merge all cars with all trucks (don't use the 'combineLatest' operator)
//* step 2: make sure that the trucks output before the cars
// concat(cars$, trucks$) // !concat could be used only if cars$.complete()
merge(
  cars$.pipe(delay(1000)),
  trucks$
)
// .subscribe(value => console.log('#7: ', value))

//* #8 ---
//* step 1: only get the cars by make Ford and Volvo
//* step 2: merge the trucks into the cars stream and make sure only the trucks of the same brand as the cars will be in the stream output 
//* (HINT: take a look at mergeMap and switchMap, only the trucks should be returned)
cars$.pipe(
  filter(car => car.make === 'Ford' || car.make === 'Volvo'),
  mergeMap(car => trucks$.pipe(filter(truck => truck.make === car.make)))
)
// .subscribe(car => console.log(car));

//* #9 ---
//* step 1: only emit the results of whoever emits first, 
//* if cars$ emits first then the trucks$ should be ignored completely
race(cars$, trucks$)
// .subscribe((vechicle: Car | Truck) => console.log(vechicle));

//* #10 ---
//* step 1: the first value of cars$ should be combined with the first value of trucks$
//* cars$ = [1,2,3,4,5]; trucks$ = ['a', 'b', 'c']; result = [ [1,'a'], [2,'b'], [3,'c'] ]
zip(cars$, trucks$)
// .subscribe((vechicles: [Car, Truck]) => console.log(vechicles))

//* #11 ---
//* step 1: log something every 2000ms (the value can be a static value)
const interval$ = interval(1000);
const timer$ = timer(5000);
interval$.pipe(
  takeUntil(timer$)
)
// .subscribe(() => console.log('interval value'));

// timer$.subscribe(() => console.log('interval value completed by timer'))

runDataStream();



