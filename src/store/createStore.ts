import * as redux from "redux";
import {applyMiddleware, Store} from "redux";
import createSagaMiddleware from 'redux-saga';
import messageReducer, {RootState} from "./rootState";
import {rootSaga} from "./sagas";

export const createStore = (): Store<RootState> => {
    const sagaMiddleware = createSagaMiddleware();

    const store = redux.createStore(
        messageReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
