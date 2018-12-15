import {Action, handleAction, handleActions} from 'redux-actions';
import {combineReducers, Reducer} from 'redux';
import {changeMessage, loadTasksListIntoState} from './actions';
import {Task} from '../domain/Task';
import {ReturnType} from '../types/ReturnType';

import login, * as LoginPageState from './state/pages/login';

type TasksState = Task[] | null;

export type RootState = {
    tasks: TasksState,
    pages: {
        login: LoginPageState.LocalState
    }
}

const tasksReducer: Reducer<TasksState> = handleAction(
    loadTasksListIntoState,
    (state, action) => action.payload || null,
    null
);

const reducer: Reducer<RootState> = combineReducers({
    tasks: tasksReducer,
    pages: combineReducers({
        login
    })
});

export default reducer;
