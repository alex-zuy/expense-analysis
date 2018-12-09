import * as React from 'react';
import {combineReducers, Store} from 'redux';
import {connect, Provider} from 'react-redux';

import {createStore} from './store/createStore';
import {RootState} from './store/rootState';
import * as actions from './store/actions';
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
            <div>
                <Provider store={this.store}>
                    <TasksList/>
                </Provider>
            </div>
        );
    }
}

export default App;
