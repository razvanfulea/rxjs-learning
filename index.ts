import { concatMap, Observable } from 'rxjs';
import { of, interval, filter, take } from 'rxjs';

function first() {
	const observable = new Observable(subscriber => {
		subscriber.next(1);
		subscriber.next(2);
		subscriber.next(3);
		setTimeout(() => {
			subscriber.next(4);
			subscriber.complete();
		}, 1000);
	});
	
	console.log('before subscribe');
	observable.subscribe({
		next(x) { console.log(`got ${x}`) },
		error(err) { console.error(`error: ${err}`) },
		complete() { console.log('complete') }
	});
	console.log('after subscribe');
}

function emitEverySecond() {
	const observable = new Observable(subscriber => {
		setInterval(() => subscriber.next("hi"), 1000);
	});
	observable.subscribe(val => console.log(val));
}

function unsubscribeFromObservable() {
	let i = 0;
	const observable = new Observable(function subscribe(subscriber) {
		const id = setInterval(() => subscriber.next(i++), 1000);
		return function unsubscribe() { clearInterval(id); }
	})
	const subscription = observable.subscribe(val => console.log(val));
	setTimeout(() => subscription.unsubscribe(), 6000);
}

function observerAsArgument() {
	const observable = new Observable(subscriber => {
		subscriber.next(1);
		subscriber.next(2);
		// subscriber.error('something bad happened');
		subscriber.next(3);
		setTimeout(() => {
			subscriber.next(4);
			subscriber.complete();
		}, 1000);
	});
	const observer = {
		next: x => console.log(`Got a new value ${x}`),
		error: err => console.log(`Error: ${err}`),
		complete: () => console.log('Done!')
	};
	observable.subscribe(observer);
}

function filterOperators() {
	const observable: Observable<number> = interval(1000);
	observable.pipe(
		filter(x => x % 2 == 0),
		take(3)
	).subscribe(x => console.log(x));
	console.log('------------------------');
	observable.pipe(
		take(3),
		filter(x => x % 2 == 0)
	).subscribe(x => console.log(x));
}

function chainObservables() {
	const observable: Observable<number> = of(1,2,3);
	const observableGetUserIdByVal = (val: number) => new Observable(subscriber => {
		subscriber.next(val * val);
	});
	const observableGetUserById = (val: any) => new Observable(subscriber => {
		subscriber.next(`user${val}`)
	});

	observable.pipe(
		concatMap(x => observableGetUserIdByVal(x)),
		concatMap(id => observableGetUserById(id))
	).subscribe(user => console.log(user));
}

const main = () => {
	// first();
	// emitEverySecond();
	// unsubscribeFromObservable();
	// observerAsArgument();
	// filterOperators();
	// chainObservables();
}

main();