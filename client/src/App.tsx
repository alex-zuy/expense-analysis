import * as React from 'react';
import {combineReducers, Store} from 'redux';
import {connect, Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import {createStore} from './store/createStore';
import {RootState} from './store/rootState';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './routes/guest/LoginPage/LoginPage';

class App extends React.Component<{}> {

    private store: Store<RootState>;

    constructor(props: {}) {
        super(props);
        this.store = createStore();
    }

    public render() {
        return (
            <Provider store={this.store}>
                <BrowserRouter>
                    <div style={{height: '100%'}}>
                        {false && <DashboardLayout
                            menu={'menu content'}
                            content={null}
                        />}
                        <Route path="/login" exact component={LoginPage}/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
