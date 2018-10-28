import {Action, handleAction, Reducer} from "redux-actions";
import {changeMessage} from "./actions";

export type RootState = string | null;

const messageReducer: Reducer<RootState, string> = handleAction(
    changeMessage,
    (state, action) => action.payload!,
    null
);

export default messageReducer;
