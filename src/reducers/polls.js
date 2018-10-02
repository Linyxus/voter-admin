import { FETCH_LIST_SUCCEED } from "../action";
import constants from "../constants";

const polls = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIST_SUCCEED:
      let polls = {};
      for (const poll of action.polls) {
        polls[poll.id] = poll;
        polls[poll.id].status = constants.POLL.INVALID;
      }
      return Object.assign({}, state, polls);
    default:
      return state;
  }
}

export default polls;