import {combineReducers, Reducer} from 'redux';
import {ActionType, createStandardAction, getType} from 'typesafe-actions';

export interface FieldsState {
    email: string,
    password: string,
}

export interface StatusState {
    error: string | null,
    finished: boolean
}

export interface LoginState {
    fields: FieldsState,
    loginStatus: StatusState
}

export const actions = {
    changeEmail: createStandardAction('login-page/email_change')<string>(),
    changePassword: createStandardAction('login-page/password_change')<string>(),
    attemptLogin: createStandardAction('login-page/login_attempt')(),
    finishLogin: createStandardAction('login-page/login_finish')(),
    failLogin: createStandardAction('login-page/login_fail')<string | null>(),
};

export const selectors = {
    getFields: (state: LoginState) => state.fields,
    getLoginStatus: (state: LoginState) => state.loginStatus
};

export type LoginAction = ActionType<typeof actions>;

const fieldsReducer = (state = {email: '', password: ''}, action: LoginAction) => {
    switch(action.type) {
        case getType(actions.changeEmail):
            return {...state, email: action.payload};
        case getType(actions.changePassword):
            return {...state, password: action.payload};
        default:
            return state;
    }
};

const loginStatusReducer = (state = {error: null, finished: false}, action: LoginAction) => {
    switch(action.type) {
        case getType(actions.attemptLogin):
            return {...state, error: null};
        case getType(actions.failLogin):
            return {...state, error: action.payload};
        case getType(actions.finishLogin):
            return {...state, finished: true};
        default:
            return state;
    }
};

const reducer: Reducer<LoginState> = combineReducers({
    fields: fieldsReducer,
    loginStatus: loginStatusReducer
});

export default reducer;
