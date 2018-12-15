import {createAction} from 'redux-actions';
import {Task} from '../domain/Task';

export const changeMessage = createAction<string>('CHANGE_MESSAGE');

export const changeMessageAsync = createAction<string>('CHANGE_MESSAGE_ASYNC');

export const loadInitialData = createAction('LOAD_INITIAL_DATA');

export const loadTasksListIntoState = createAction<Task[]>('LOAD_TASKS_LIST_INTO_STATE');
