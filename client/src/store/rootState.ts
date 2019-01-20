import {combineReducers, Reducer} from 'redux';
import login, * as loginPageState from './state/pages/login';
import isLoggedIn, * as isLoggedInState from './state/isLoggedIn';

export type RootState = {
    pages: {
        login: loginPageState.LoginState
    },
    isLoggedIn: isLoggedInState.IsLoggedInState
}

const reducer: Reducer<RootState> = combineReducers({
    pages: combineReducers({
        login
    }),
    isLoggedIn
});

export default reducer;
