import { CHANGE_BANK } from "../actions/changeBank";

const bank = (state = '', action) => {
  switch (action.type) {
    case CHANGE_BANK:
      return state !== 'one' ? 'one' : 'two';
    default:
      return state;
  }
};

export default bank;