import * as React from 'react';
import { Provider } from 'react-redux';

import { applyMiddleware, compose, createStore, Store, Reducer } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';

import initSubscriber from './storeSubscribe';
import { showSnackbar } from './modules/info/utils';
import CrashModal from 'components/CrashModal';

let store: Store; // To enable export

/*
 * This component is used to catch Component + Redux + Saga errors
 * Usage:
 * const AppProvider = storeProvider(rootReducer, rootSaga);
 * <AppProvider>
 *   <AppComponent>
 * </AppProvider>
 */
const DEBUG_MODE = process.env.NODE_ENV === 'development' && false;

interface State {
  error: any;
}
const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => showSnackbar(`An error has occured: ${error.message}`, 'error'),
});

export function initializeStore(reducer: Reducer, saga: Saga): Store {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;
  //const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  //  // Optionally pass options
  //  actionTransformer: action => {
  //    if (action.type === 'SET_TIME') {
  //      return null;
  //    } else return action;
  //  },
  //});
  const applied = applyMiddleware(sagaMiddleware);
  const enhancer = composeEnhancers(applied); //, sentryReduxEnhancer);
  store = createStore(reducer, enhancer); // Enable export
  initSubscriber(store);

  try {
    sagaMiddleware.run(saga);
  } catch (e) {
    console.error(e);
  }

  return store;
}

const storeProvider = (reducer: Reducer, saga: Saga) => {
  class AppProvider extends React.Component<any, State> {
    _isMounted: boolean | undefined;
    store: Store;
    state = { error: null };

    constructor(props: Readonly<any>) {
      super(props);

      /*
      const catchingReducer = (state: any, action: any) => {
        try {
          return reducer(state, action);
        } catch (e) {
          console.error(e);
          this.showError(e);
          return state;
        }
      };*/
      const sagaMiddleware = createSagaMiddleware();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
      const composeEnhancers =
        process.env.NODE_ENV === 'development'
          ? devTools
            ? devTools({
                trace: DEBUG_MODE, // (action) => { return ‘trace as string’; }
                traceLimit: 25,
              })
            : compose
          : compose;
      const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
      store = createStore(reducer, enhancer); // Enable export

      initSubscriber(store);

      //try {
      sagaMiddleware.run(saga);
      /*} catch (e) {
        this.showError(e);
      }*/
      this.store = store;
    }

    componentDidMount() {
      this._isMounted = true;
    }

    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { error: true };
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    componentDidCatch(error: any) {
      //this.showError(error);
    }

    showError = (error: any) => {
      /*
       * This can be called even before component mounted, since there can be error in the first round of
       * reducer when creating store. And we definitely dont want to create store as late as in componentDidMount.
       * Hence, this small "helper" to simplify architecture. Which is no big deal,
       * its used only for critical error state when app cannot continue anyway.
       */
      if (this._isMounted) {
        this.setState({ error });
      } else {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = { error };
      }
    };

    render() {
      if (this.state.error) {
        if (process.env.NODE_ENV === 'development') {
          return <CrashModal />; // Development error message or component
        }
        return <CrashModal />; // Production error message or component
      }
      return (
        <Provider {...this.props} store={this.store}>
          {/*<PersistGate {...this.props} loading={null} persistor={persistStore(this.store)} />*/}
        </Provider>
      );
    }
  }
  return { AppProvider };
};

export default storeProvider;

export { store, sagaMiddleware };
