export const CHANGE_OUTPUT = 'CHANGE_OUTPUT';

const changeOutput = (operator) =>
  (dispatch, getState) =>
    (getState().calculator.timeoutID === null) ?
      dispatch({
        type: CHANGE_OUTPUT,
        operator
      }) :
      undefined;


export default changeOutput;