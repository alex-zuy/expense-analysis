import {Action, handleAction, handleActions} from 'redux-actions';
import {changeMessage, loadTasksListIntoState} from './actions';
import {Task} from '../domain/Task';
import {combineReducers, Reducer} from 'redux';
import {ReturnType} from '../types/ReturnType';

type TasksState = Task[] | null;

export type RootState = {
    tasks: TasksState
}

const tasksReducer: Reducer<TasksState> = handleAction(
    loadTasksListIntoState,
    (state, action) => action.payload || null,
    null
);

export default combineReducers({
    tasks: tasksReducer,
});
