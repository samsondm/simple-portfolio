import { combineReducers } from 'redux';
import display from './display';
import power from './power';
import bank from './bank';
import volume from './volume';

const rootReducer = combineReducers({
  display,
  power,
  bank,
  volume
});

export default rootReducer;