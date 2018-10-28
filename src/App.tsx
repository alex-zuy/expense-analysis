import * as React from 'react';
import {combineReducers, Store} from 'redux';
import {connect, Provider} from "react-redux";
import './App.css';

import {createStore} from "./store/createStore";
import {changeMessage, changeMessageAsync} from "./store/actions";
import {RootState} from "./store/rootState";
import Message from "./Message/Message";

class App extends React.Component<{}> {

    private store: Store<RootState>;

    constructor(props: {}) {
        super(props);
        this.store = createStore();
    }

  public render() {
    return (
      <div>
          <button type="button" onClick={() => this.store.dispatch(changeMessage('banana'))}>
              Banana
          </button>
          <button type="button" onClick={() => this.store.dispatch(changeMessageAsync('banana async'))}>
              Banana async
          </button>
          <Provider store={this.store}>
              <Message/>
          </Provider>
      </div>
    );
  }
}

export default App;
