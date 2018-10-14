import React, { Component } from 'react';
import './CalcContainer.css';
import Calc from './components/Calc';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

class CalcContainer extends Component {
  store = createStore(rootReducer, applyMiddleware(thunk));

  render() {
    return (
      <Provider store={this.store}>
        <Calc />
      </Provider>
    );
  }
}

export default CalcContainer;
