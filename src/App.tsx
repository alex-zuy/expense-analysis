import * as React from 'react';
import {combineReducers, Store} from 'redux';
import {connect, Provider} from 'react-redux';

import {createStore} from './store/createStore';
import {RootState} from './store/rootState';
import * as actions from './store/actions';
import DashboardLayout from './components/DashboardLayout';
import TasksList from './TasksList/TasksList';

class App extends React.Component<{}> {

    private store: Store<RootState>;

    constructor(props: {}) {
        super(props);
        this.store = createStore();
    }

    componentDidMount() {
        this.store.dispatch(actions.loadInitialData());
    }

    public render() {
        return (
            <Provider store={this.store}>
                <DashboardLayout
                    menu={'menu content'}
                    content={<TasksList/>}
                />
            </Provider>
        );
    }
}

export default App;
