import {combineReducers, Reducer} from 'redux';
import {createAction, handleAction, handleActions} from 'redux-actions';
import reduceReducers from 'reduce-reducers';

const PREFIX = 'login-page/';

export interface FieldsState {
    email: string,
    password: string,
}

export interface LoginStatusState {
    loginError: string | null,
    loginFinished: boolean
}

export interface LocalState {
    fields: FieldsState,
    loginStatus: LoginStatusState
}

export const actions = {
    changeEmail: createAction<string>(PREFIX + 'email-change'),
    changePassword: createAction<string>(PREFIX + 'password-change'),
    attemptLogin: createAction(PREFIX + 'login-attempt'),
    finishLogin: createAction(PREFIX + 'login-finish'),
    failLogin: createAction<string | null>(PREFIX + 'login-fail')
};

export const selectors = {
    getFields: (state: LocalState) => state.fields,
    getLoginStatus: (state: LocalState) => state.loginStatus
};

const fieldsReducer: Reducer<FieldsState> = combineReducers({
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

const loginStatusReducer: Reducer<LoginStatusState> =
    handleActions<LoginStatusState, any>({
        [String(actions.failLogin)]: (state, action) => ({...state, loginError: action.payload || null}),
        [String(actions.finishLogin)]: (state, action) => ({...state, loginError: false, loginFinished: true})
    },
    {
        loginError: null,
        loginFinished: false
    });

const reducer: Reducer<LocalState> = combineReducers({
    fields: fieldsReducer,
    loginStatus: loginStatusReducer
});

export default reducer;
