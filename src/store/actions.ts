import {createAction} from "redux-actions";

export const changeMessage = createAction<string>('CHANGE_MESSAGE');

export const changeMessageAsync = createAction<string>('CHANGE_MESSAGE_ASYNC');
