import {combineReducers, Reducer} from 'redux';
import {ActionType, createStandardAction, getType} from 'typesafe-actions';

export interface FieldsState {
    email: string,
    password: string,
}

export interface LoginState {
    fields: FieldsState,
    loginError: string | null
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
    getLoginError: (state: LoginState) => state.loginError
};

export type LoginAction = ActionType<typeof actions>;

const INITIAL_FIELDS_STATE = {email: '', password: ''};
const fieldsReducer = (state = INITIAL_FIELDS_STATE, action: LoginAction) => {
    switch(action.type) {
        case getType(actions.changeEmail):
            return {...state, email: action.payload};
        case getType(actions.changePassword):
            return {...state, password: action.payload};
        case getType(actions.finishLogin):
            return INITIAL_FIELDS_STATE;
        default:
            return state;
    }
};

const loginStatusReducer = (state = null, action: LoginAction) => {
    switch(action.type) {
        case getType(actions.finishLogin):
        case getType(actions.attemptLogin):
            return null;
        case getType(actions.failLogin):
            return action.payload;
        default:
            return state;
    }
};

const reducer: Reducer<LoginState> = combineReducers({
    fields: fieldsReducer,
    loginError: loginStatusReducer
});

export default reducer;
