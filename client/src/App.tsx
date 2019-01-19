import * as React from 'react';
import {combineReducers, Store} from 'redux';
import {connect, Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {Environment} from 'relay-runtime';
import CurrentUser from './components/CurrentUser';

import {createStore} from './store/createStore';
import {RootState} from './store/rootState';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './routes/guest/LoginPage/LoginPage';
import {createEnvironment} from './graphql/createEnvironment';
import GraphQlContext from './context/graphql';

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
                <GraphQlContext.Provider value={this.graphQlEnvironment}>
                    <BrowserRouter>
                        <div style={{height: '100%'}}>
                            <Route path="/" exact component={() => (
                                <DashboardLayout
                                    menu={<CurrentUser/>}
                                    content={null}
                                />
                            )}>
                            </Route>
                            <Route path="/login" exact component={LoginPage}/>
                        </div>
                    </BrowserRouter>
                </GraphQlContext.Provider>
            </Provider>
        );
    }
}

export default App;
