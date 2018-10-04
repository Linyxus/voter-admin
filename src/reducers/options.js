import { FETCH_LIST_SUCCEED, FETCH_OPTION_REQUEST, FETCH_OPTION_SUCCEED, FETCH_OPTION_FAIL } from "../action";
import constants from "../constants";

const options = (state = {}, action) => {
  let options = {};
  let option = undefined;
  switch (action.type) {
  case FETCH_LIST_SUCCEED:
    options = {};
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
    option = state[action.id];
    if (option === undefined) {
      option = {id: action.id};
    }
    option.status = constants.COMMON.FETCHING;
    // TODO: finish the option reducer (similar to poll reuducer)
    return Object.assign({}, state, {[action.id]: option});
  case FETCH_OPTION_FAIL:
    option = state[action.id];
    option.status = constants.COMMON.INVALID;
    return Object.assign({}, state, {[action.id]: option});
  case FETCH_OPTION_SUCCEED:
    option = state[action.option.id];
    option.status = constants.COMMON.NORMAL;
    option = Object.assign({}, option, action.option);
    return Object.assign({}, state, {[action.option.id]: option})
  default:
    return state;
  }
};

export default options;