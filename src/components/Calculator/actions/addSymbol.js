import showNotificationWithTimeout from "./showLimit";
import addDecimal from "./addDecimal";
import addDigit from "./addDigit";

const addSymbol = (symbol) =>
  (dispatch, getState) => {
    if (getState().calculator.timeoutID === null) {
      if (getState().calculator.input.length < 20) {
        if (symbol === '.') {
          dispatch(addDecimal());
        } else {
          dispatch(addDigit(symbol));
        }
      } else {
        dispatch(showNotificationWithTimeout(getState().calculator.input));
      }
    }
  };

export default addSymbol;