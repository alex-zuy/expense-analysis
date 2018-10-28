import {createAction} from "redux-actions";

export const changeMessage = createAction<string>('CHANGE_MESSAGE');
