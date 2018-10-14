import { ADD_DECIMAL } from "../actions/addDecimal";
import { ADD_DIGIT } from "../actions/addDigit";
import { CLEAR_CALC } from "../actions/allClear";
import { CHANGE_OUTPUT } from "../actions/changeOutput";
import yardCalc from "../utility/rpn";
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actions/showLimit";
import replaceChars from "../utility/replaceChars";

const defaultState = {
  output: '',       // formula
  input: '0',       // display
  lastOperator: '', // save last operator for convinience
  timeoutID: null,  // notification setTimeout id
};

const calcReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_DECIMAL: {
      const output = state.lastOperator === '=' ? '' : state.output;
      if (state.input.indexOf('.') > -1) {
        return state;
      }
      if (state.lastOperator) {
        return {
          ...state,
          output,
          input: '0.',
          lastOperator: ''
        };
      }
      return {
        ...state,
        output,
        input: state.input.concat('.')
      };
    }
    case ADD_DIGIT: {
      const output = state.lastOperator === '=' ? '' : state.output;
      // adding digit to a fresh input
      if (state.input === '0' || state.lastOperator) {
        return {
          ...state,
          output,
          input: action.digit,
          lastOperator: ''
        };
      }
      return {
        ...state,
        output,
        input: state.input.concat(action.digit)
      };
    }
    case CHANGE_OUTPUT: {
      let result = '',
        input = state.input,
        display = action.operator,
        presicion = Math.pow(10, 7);

      if (state.lastOperator) {
        // check if we already evaluated
        if (state.lastOperator === '=') {
          // do nothing on futher eval
          if (action.operator === '=') {
            return state;
          }
          return {
            ...state,
            output: state.input.concat(action.operator),
            input: display,
            lastOperator: action.operator
          };
        }
        if (action.operator === '=') {
          result = Math.round(
            yardCalc(replaceChars(state.output.slice(0, -1))) * presicion) / presicion;
          display = result.toString();
        }
        return {
          ...state,
          output: state.output.slice(0, -1).concat(action.operator, result),
          input: display,
          lastOperator: action.operator,
        };
      }
      if (!isNaN(state.input)) {
        input = (+input).toString();
      }

      if (action.operator === '=') {
        result = Math.round(yardCalc(replaceChars(state.output.concat(input))) * presicion)
          / presicion;
        display = result.toString();
      }
      return {
        ...state,
        output: state.output.concat(input, action.operator, result),
        input: display,
        lastOperator: action.operator,
      };
    }
    case SHOW_NOTIFICATION:
      return {
        ...state,
        input: 'LIMIT',
        timeoutID: action.id
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        input: action.prevDisplay,
        timeoutID: null
      };
    case CLEAR_CALC:
      clearTimeout(state.timeoutID);
      return defaultState;
    default:
      return state;
  }
};

export default calcReducer;