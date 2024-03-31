// https://ronnieschaniel.com/rxjs/rxjs-mastery-multicast-operators/
// https://github.com/rschaniel/rxjs_in_x_lessons/tree/main
import { Observable, Subject, merge, interval, share } from 'rxjs';
import { connect, filter, map, tap, take } from 'rxjs/operators';

const done = (): void => {
    console.log('Stream is completed')
}

const heavyAsyncTask = (input?: any): any => {
    console.log('heavy async task triggered');
    return input ?? 'result';
};

const observable = new Observable((subscriber) => {
    const result = heavyAsyncTask();
    subscriber.next(result);
});

// Observables are by default cold and unicast
console.log(" \nSimple Observable flow:  \n")
observable.subscribe({ next: r => console.log('subscriber 1 got: ' + r)});
observable.subscribe({ next: r => console.log('subscriber 2 got: ' + r)});

// Multicasting through an explicit Subject
console.log(" \nSubject Observable flow: \n")
const subject$ = new Subject();
subject$.subscribe({ next: r => console.log('subscriber by subject 1 got: ' + r)});
subject$.subscribe({ next: r => console.log('subscriber by subject 2 got: ' + r)});
observable.subscribe(subject$); // important to subscribe after the subscriptions to subject$

// connect
console.log(" \nConnect multicasting flow: \n")
const observable$ = new Observable<number>((subscriber) => {
    subscriber.next(heavyAsyncTask(1));
    subscriber.next(heavyAsyncTask(2));
    subscriber.next(heavyAsyncTask(3));
});

observable$.pipe(
    connect(shared$ => merge(
        shared$.pipe(map(n => `all ${ n }`)),
        shared$.pipe(filter(n => n % 2 === 0), map(n => `even ${ n }`)),
        shared$.pipe(filter(n => n % 2 === 1), map(n => `odd ${ n }`))
    ))
).subscribe(console.log);

// share multicast
console.log(" \nShare  multicasting flow: \n");
const source$ = interval(1000).pipe(
    tap(x => console.log('The heavy task calculated', x)),
    take(3),
    share(),
);

source$.subscribe({ next: r => console.log('subscriber 1 got: ' + r)});
source$.subscribe({ next: r => console.log('subscriber 2 got: ' + r), complete: done});

// shareReplay
console.log(" \nShareReplay  multicasting flow: \n");
source$.subscribe({ next: r => console.log('subscriber 1 got: ' + r)});

setTimeout(() => {
    source$.subscribe({ next: r => console.log('subscriber 2 got: ' + r), complete: done});
}, 2500);


