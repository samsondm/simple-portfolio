import React, { Component } from 'react';
import './DrumMachine.css';
import ControlPad from './components/ControlPad';
import TuneDramPad from './containers/TuneDramPad';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


class DrumMachine extends Component {
  store = createStore(rootReducer, {
    display: String.fromCharCode(160),
    power: true,
    bank: 'one',
    volume: 30
  });

  render() {
    return (
      <Provider store={this.store}>
        <div className="drum-machine">
          <TuneDramPad />
          <ControlPad />
        </div>
      </Provider>
    );
  }
}

export default DrumMachine;
