import {changeMessage, changeMessageAsync} from "./actions";
import {all, put} from "redux-saga/effects";
import {takeEvery} from "redux-saga/effects";
import {Action} from "redux-actions";
import {delay} from "redux-saga";
import {ReturnType} from "../types/ReturnType";

function* changeMessageAsyncSaga(action: ReturnType<typeof changeMessageAsync>) {
    yield delay(500);
    yield put(changeMessage(action.payload!));
}

function* changeMessageAsyncWatcher() {
    yield takeEvery(changeMessageAsync, changeMessageAsyncSaga);
}

export function* rootSaga() {
    yield all([
        changeMessageAsyncWatcher()
    ])
}
