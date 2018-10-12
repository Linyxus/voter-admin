import { FETCH_LIST_SUCCEED, FETCH_POLL_REQUEST, FETCH_POLL_FAIL, FETCH_POLL_SUCCEED, VALIDATE_POLL_REQUEST, VALIDATE_POLL_FAIL, VALIDATE_POLL_SUCCEED } from "../action";
import constants from "../constants";
import u from 'updeep';

const polls = (state = {}, action) => {
  let polls = {};
  let poll = null;
  switch (action.type) {
  case FETCH_LIST_SUCCEED:
    polls = {};
    for (const poll of action.polls) {
      polls[poll.id] = poll;
      polls[poll.id].status = constants.POLL.INVALID;
    }
    return Object.assign({}, state, polls);
  case FETCH_POLL_REQUEST:
    poll = state[action.id];
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
  case VALIDATE_POLL_REQUEST:
    return u({
      [action.pollId]: {
        status: constants.POLL.VALIDATING,
      }
    }, state);
  case VALIDATE_POLL_FAIL:
    return u({
      [action.pollId]: {
        status: constants.POLL.VALIDATING,
      }
    }, state);
  case VALIDATE_POLL_SUCCEED:
    return u({
      [action.pollId]: {
        status: constants.POLL.FINISHED,
      }
    }, state);
  default:
    return state;
  }
};

export default polls;