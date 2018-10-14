import { CHANGE_POWER } from "../actions/changePower";

const power = (state = true, action) => {
  switch (action.type) {
    case CHANGE_POWER:
      return !state;
    default:
      return state;
  }
};

export default power;