import * as redux from "redux";
import {Store} from "redux";
import messageReducer, {RootState} from "./rootState";

export const createStore = (): Store<RootState> => redux.createStore(
    messageReducer,
);
