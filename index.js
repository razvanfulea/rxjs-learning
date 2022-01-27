import { Observable } from 'rxjs';

console.log("hi");
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