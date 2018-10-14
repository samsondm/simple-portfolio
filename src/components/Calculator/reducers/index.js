import { combineReducers } from 'redux';
import calcReducer from './calculator';

const rootReducer = combineReducers({
  calculator: calcReducer
});

export default rootReducer;