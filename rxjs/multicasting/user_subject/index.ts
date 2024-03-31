// TODO: proceed advanced rxjs
// https://liveloveapp.com/courses/advanced-rxjs

import { Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

interface UserResponse {
  data: User;
}

const user$ = ajax
  .getJSON<UserResponse>("https://reqres.in/api/users/2")
  .pipe(map((response) => {
    console.log('API request')
    return response.data;
  }));

/**
 * 1. Subscribe to the `user$` observable multiple times.
 *
 * Multiple subscribers to a cold observable create multiple
 * independent executions of the observerable.
 *
 * Since our cold observable is performing a fetch request
 * if we look at the network tab in the developer tools we
 * will see multiple requests.
 */
user$.subscribe((user: User) => console.log('Subscribe 1: ', user));
user$.subscribe((user: User) => console.log('Subscribe 2: ', user));
user$.subscribe((user: User) => console.log('Subscribe 3: ', user));
user$.subscribe((user: User) => console.log('Subscribe 4: ', user));

/**
 * 2. Comment out the subscriptions to the observable above
 *    and use a Subject to multicast.
 */

const userSubject = new Subject();
const sub1 = userSubject.subscribe(console.log);
const sub2 = userSubject.subscribe(console.log);

// user$.subscribe({
//   next: (user) => userSubject.next(user),
//   error: (e) => userSubject.error(e),
//   complete: () => userSubject.complete()
// });

/**
 * 3. use the subject as the observer.
 */
user$.subscribe(userSubject);
