import * as redux from 'redux';
import {applyMiddleware, compose, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {RootState} from './rootState';
import {rootSaga} from './sagas';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
    }
}

export const createStore = (): Store<RootState> => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = redux.createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
