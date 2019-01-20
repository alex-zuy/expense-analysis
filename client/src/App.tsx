import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {Store} from 'redux';
import {Environment} from 'relay-runtime';
import {createEnvironment} from './graphql/createEnvironment';
import EnvironmentContext from './graphql/environmentContext';
import LoginPage from './routes/guest/LoginPage/LoginPage';
import Dashboard from './routes/user/Dashboard';

import {createStore} from './store/createStore';
import {RootState} from './store/rootState';

class App extends React.Component<{}> {

    private readonly store: Store<RootState>;
    private readonly graphQlEnvironment: Environment;

    constructor(props: {}) {
        super(props);
        this.store = createStore();
        this.graphQlEnvironment = createEnvironment();
    }

    public render() {
        return (
            <Provider store={this.store}>
                <EnvironmentContext.Provider value={this.graphQlEnvironment}>
                    <BrowserRouter>
                        <div style={{height: '100%'}}>
                            <Route path="/" exact component={Dashboard}/>
                            <Route path="/login" exact component={LoginPage}/>
                        </div>
                    </BrowserRouter>
                </EnvironmentContext.Provider>
            </Provider>
        );
    }
}

export default App;
