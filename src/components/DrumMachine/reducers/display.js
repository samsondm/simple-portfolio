import { CHANGE_DISPLAY } from "../actions/changeDisplay";

const display = (state = '', action) => {
  switch (action.type) {
    case CHANGE_DISPLAY:
      return action.display;
    default:
      return state;
  }
};

export default display;