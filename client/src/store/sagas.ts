import {Action} from 'redux-actions';
import {delay} from 'redux-saga';
import {all, put, take, takeEvery, select} from 'redux-saga/effects';
import * as actions from './actions';
import * as tasksApi from '../api/tasks';
import * as authenticationApi from '../api/authentication';
import {RootState} from './rootState';
import * as loginState from './state/pages/login';
import * as loginPageState from './state/pages/login';
import {ReturnType} from '../types/ReturnType';
import {AxiosResponse} from 'axios';
import {Task} from '../domain/Task';

function* loadInitialDataSaga(action: ReturnType<typeof actions.loadInitialData>) {
    const tasks: AxiosResponse<Task> = yield tasksApi.getTask();
    yield put(actions.loadTasksListIntoState([tasks.data]));
}

function* loadInitialDataWatcher() {
    yield loadInitialDataSaga(yield take(actions.loadInitialData));
}

function* attemptLogin(action: ReturnType<typeof loginPageState.actions.attemptLogin>) {
    const fields: loginState.FieldsState = yield select(
        (state: RootState) => loginPageState.selectors.getFields(state.pages.login)
    );

    try {
        const response: AxiosResponse = yield authenticationApi.login(fields.email, fields.password);
        yield put(loginPageState.actions.finishLogin());
    } catch (e) {
        yield put(loginPageState.actions.failLogin(e.message));
    }
}

function* attemptLoginWatcher() {
    yield takeEvery(loginPageState.actions.attemptLogin, attemptLogin);
}

export function* rootSaga() {
    yield all([
        loadInitialDataWatcher(),
        attemptLoginWatcher()
    ])
}
