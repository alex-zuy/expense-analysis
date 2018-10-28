import {Action} from "redux-actions";
import {delay} from "redux-saga";
import {all, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "./actions";
import * as tasksApi from '../api/tasks';
import {ReturnType} from "../types/ReturnType";
import {AxiosResponse} from "axios";
import {Task} from "../domain/Task";

function* loadInitialDataSaga(action: ReturnType<typeof actions.loadInitialData>) {
    const tasks: AxiosResponse<Task[]> = yield tasksApi.getTasks();
    yield put(actions.loadTasksListIntoState(tasks.data));
}

function* loadInitialDataWatcher() {
    yield loadInitialDataSaga(yield take(actions.loadInitialData));
}

export function* rootSaga() {
    yield all([
        loadInitialDataWatcher(),
    ])
}
