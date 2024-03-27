import { Subject } from 'rxjs';
import { Car } from './types/car.type';
import { Truck } from './types/truck.type';

export const cars$ = new Subject<Car>();
export const trucks$ = new Subject<Truck>();

export const runDataStream = () => {
	cars$.next({ id: 'c1', make: 'BMW', model: 'M5', color: 'red' });
	cars$.next({ id: 'c2', make: 'Mercedes', model: 'E', color: 'black' });
	cars$.next({ id: 'c3', make: 'Audi', model: 'RS6', color: 'green' });
	cars$.next({ id: 'c4', make: 'Citroen', model: 'C4', color: 'black' });

	trucks$.next({ id: 't1', make: 'MAN', model: 'big', color: 'red' });
	trucks$.next({ id: 't2', make: 'Mercedes', model: 'bigger', color: 'black' });

	cars$.next({ id: 'c5', make: 'Peugeot', model: '308', color: 'red' });
	cars$.next({
		id: 'c6',
		make: 'Maserati',
		model: 'GranTurismo',
		color: 'black',
	});
	cars$.next({ id: 'c7', make: 'Astin Martin', model: 'DB9', color: 'silver' });
	cars$.next({ id: 'c8', make: 'Nissan', model: 'Note', color: 'blue' });
	cars$.next({ id: 'c9', make: 'Opel', model: 'Corsa', color: 'blue' });
	cars$.next({ id: 'c10', make: 'Ford', model: 'GT', color: 'red' });
	cars$.next({ id: 'c11', make: 'Volvo', model: 'S90', color: 'silver' });

	trucks$.next({ id: 't3', make: 'Scania', model: 'biggest', color: 'green' });
	trucks$.next({ id: 't4', make: 'Renault', model: 'small', color: 'black' });
	trucks$.next({ id: 't5', make: 'Ford', model: 'smaller', color: 'red' });
	trucks$.next({ id: 't6', make: 'DAF', model: 'smallest', color: 'black' });
	trucks$.next({ id: 't7', make: 'Volvo', model: 'swedish', color: 'silver' });

	// delayed
	setTimeout(() => {
		cars$.next({ id: 'c12', make: 'McLaren', model: 'P1', color: 'blue' });
		cars$.next({
			id: 'c13',
			make: 'Koenigsegg',
			model: 'One:1',
			color: 'blue',
		});
	}, 1000);
};
