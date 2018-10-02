import { FETCH_LIST_SUCCEED, FETCH_POLL_REQUEST, FETCH_POLL_FAIL, FETCH_POLL_SUCCEED } from "../action";
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
    case FETCH_POLL_REQUEST:
      let poll = state[action.id];
      if (poll === undefined) {
        poll = {id: action.id};
      }
      poll.status = constants.POLL.FETCHING;
      return Object.assign({}, state, {[action.id]: poll});
    case FETCH_POLL_FAIL:
      poll = state[action.id];
      poll.status = constants.POLL.INVALID;
      return Object.assign({}, state, {[action.id]: poll});
    case FETCH_POLL_SUCCEED:
      poll = state[action.poll.id];
      poll.status = constants.POLL.NORMAL;
      poll['new_poll?'] = !action.poll.validated;
      poll = Object.assign({}, poll, action.poll);
      return Object.assign({}, state, {[action.poll.id]: poll});
    default:
      return state;
  }
}

export default polls;