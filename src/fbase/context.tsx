import { createContext } from 'react';

import { instance } from './firebase';
const FirebaseContext = createContext(instance);

export const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
