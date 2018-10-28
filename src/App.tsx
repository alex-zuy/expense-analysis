import * as React from 'react';
import {combineReducers, Store} from 'redux';
import {connect, Provider} from "react-redux";
import './App.css';

import {createStore} from "./store/createStore";
import {changeMessage} from "./store/actions";
import {RootState} from "./store/rootState";
import Message from "./Message/Message";
import logo from './logo.svg';

class App extends React.Component<{}> {

    private store: Store<RootState>;

    constructor(props: {}) {
        super(props);
        this.store = createStore();
    }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <button type="button" onClick={() => this.store.dispatch(changeMessage('banana'))}>
              Banana
          </button>
          <Provider store={this.store}>
              <Message/>
          </Provider>
      </div>
    );
  }
}

export default App;
