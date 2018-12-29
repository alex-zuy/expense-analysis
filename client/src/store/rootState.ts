import {combineReducers, Reducer} from 'redux';
import login, * as loginPageState from './state/pages/login';

export type RootState = {
    pages: {
        login: loginPageState.LoginState
    }
}

const reducer: Reducer<RootState> = combineReducers({
    pages: combineReducers({
        login
    })
});

export default reducer;
