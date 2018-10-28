import {Action, handleAction, handleActions, Reducer} from "redux-actions";
import {changeMessage, loadTasksListIntoState} from "./actions";
import {Task} from "../domain/Task";
import {combineReducers} from "redux";

type TasksState = Task[] | null;

export type RootState = {
    tasks: TasksState
}

const tasksReducer: Reducer<TasksState, any> = handleActions({
    [loadTasksListIntoState.toString()]: (state, action) => action.payload!
}, null);

export default combineReducers({
    tasks: tasksReducer,
});
