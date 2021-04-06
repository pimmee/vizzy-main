import { Store } from 'redux';

const subscribers: { [key: string]: Array<(state: any, oldState: any) => any> } = {};

export function subscribe(key: string, cb: (state: any, oldState: any) => any) {
  if (subscribers.hasOwnProperty(key)) {
    subscribers[key].push(cb);
  } else {
    subscribers[key] = [cb];
  }

  // return "unsubscribe" function
  return () => (subscribers[key] = subscribers[key].filter(s => s !== cb));
}

const getValue = (keys: string[], obj: any): any => {
  if (keys.length === 1) {
    return obj[keys[0]];
  }
  const key = keys.shift() as string;
  if (obj[key]) return getValue(keys, obj[key]);
};

export default (store: Store) => {
  let prevState = store.getState();

  store.subscribe(() => {
    const newState = store.getState();

    Object.keys(subscribers).forEach(key => {
      const keys = key.split('.');

      const ns = getValue(keys.slice(), newState);
      const os = getValue(keys.slice(), prevState);

      if (ns !== os && ns !== undefined) {
        subscribers[key].forEach(cb => cb(ns, os));
      }
    });

    prevState = newState;
  });

  return subscribe;
};
