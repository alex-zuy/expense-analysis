import {Reducer} from 'redux';
import {ActionType, createStandardAction, getType} from 'typesafe-actions';
import * as loginState from './pages/login';

export type IsLoggedInState = boolean | null;

export const actions = {
    confirmStatus: createStandardAction('is-logged-in/status-confirm')(),
    denyStatus: createStandardAction('is-logged-in/status-deny')()
};

export type IsLoggedInAction = ActionType<typeof actions>;

export const selectors = {
    getStatus: (state: IsLoggedInState) => ({
        isLoaded: state !== null,
        isLoggedIn: state !== null ? state : false
    })
};

const reducer: Reducer<IsLoggedInState> = (state = null, action) => {
    switch (action.type) {
        case getType(loginState.actions.finishLogin):
        case getType(actions.confirmStatus):
            return true;
        case getType(actions.denyStatus):
            return false;
        default:
            return state;
    }
};

export default reducer;
