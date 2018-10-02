import { FETCH_LIST_SUCCEED, FETCH_OPTION_REQUEST } from "../action";
import constants from "../constants";

const options = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIST_SUCCEED:
      let options = {};
      for (const poll of action.polls) {
        const opts = poll.options;
        for (const opt of opts) {
          if (options[opt] === undefined) {
            options[opt] = {status: constants.COMMON.INVALID, id: opt};
          }
        }
      }
      return Object.assign({}, state, options);
    case FETCH_OPTION_REQUEST:
      let option = state[action.id];
      if (option === undefined) {
        option = {id: action.id};
      }
      // TODO: finish the option reducer (similar to poll reuducer)
      break;
    default:
      return state;
  }
}

export default options;