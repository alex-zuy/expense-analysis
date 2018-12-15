import {combineReducers, Reducer} from 'redux';
import {createAction, handleAction} from 'redux-actions';

const PREFIX = 'login-page/';

export interface LocalState {
    email: string,
    password: string
}

export const actions = {
    changeEmail: createAction<string>(PREFIX + 'email-change'),
    changePassword: createAction<string>(PREFIX + 'password-change')
};

export const selectors = {
    getFields: (state: LocalState) => state,
};

const reducer: Reducer<LocalState> = combineReducers({
    email: handleAction(
        actions.changeEmail,
        (state, {payload}) => payload!,
        ''
    ),
    password: handleAction(
        actions.changePassword,
        (state, {payload}) => payload!,
        ''
    )
});

export default reducer;
