import {delay} from 'redux-saga';
import {all, put, take, takeEvery, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import * as authenticationApi from '../api/authentication';
import {RootState} from './rootState';
import * as loginPageState from './state/pages/login';
import {AxiosResponse} from 'axios';

function* attemptLogin(action: ActionType<typeof loginPageState.actions.attemptLogin>) {
    const fields: loginPageState.FieldsState = yield select(
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
        attemptLoginWatcher()
    ])
}
