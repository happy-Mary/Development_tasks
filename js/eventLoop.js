let actionCount = 0;
const log = (param) => {
  actionCount++;
  console.log(`${actionCount}: ${param}`);
};

// 1: to call stack and executes
log('log 1');

// 7: to WebApi => makrotask queue => from makrotask queue to call stack => executes
setTimeout(() => {
  log('setTimeout 1');
  // 8: moves from callstack to mikrotask queue => executes
  Promise.resolve().then(() => {
    log('promise from setTimeout 1');
  });
}, 0);

// 3: to mikrotask queue => from mikrotask queue to call stack => executes
queueMicrotask(() => log('queueMicrotask 2'));

// to WebApi => makrotask queue
// 9: to WebApi => makrotask queue =>  executes ! when microtaks queue is empty [7, 8]
setTimeout(() => {
  log('setTimeout 2')
}, 0);

// 4: to WebApi => mikrotask queue => from mikrotask queue to call stack => executes
Promise.resolve().then(() => {
  log('promise 1')
});

// 5: to mikrotask queue => from mikrotask queue to call stack => executes
queueMicrotask(() => log('queueMicrotask 1'));
 
// 6: to WebApi => mikrotask queue => from mikrotask queue to call stack => executes
Promise.resolve().then(() => {
  log('promise 2')
});

// 2: to call stack and excutes
log('log 4');

//* OUTPUT:
// 1: log 1
// 2: log 4
// 3: queueMicrotask 2
// 4: promise 1
// 5: queueMicrotask 1
// 6: promise 2
// 7: setTimeout 1
// 8: promise from setTimeout 1
// 9: setTimeout 2

//* EXPLANATION
/*
  Call stack with sync code
  Queue: Microtask: Promises, queueMicrotask, MutationObserver
  Queue: Macrotask: Events, Timers, image loading
*/

