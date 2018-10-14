import { CHANGE_VOLUME } from "../actions/changeVolume";

const volume = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_VOLUME:
      return action.volume;
    default:
      return state;
  }
};

export default volume;