import constants from '../constants';
import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCEED, FETCH_LIST_FAIL } from '../action';

const pollsList = (state = {status: constants.COMMON.INVALID, list: []}, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return Object.assign({}, state, {status: constants.COMMON.FETCHING});
    case FETCH_LIST_FAIL:
      return Object.assign({}, state, {status: constants.COMMON.INVALID});
    case FETCH_LIST_SUCCEED:
      const list = action.polls.map(poll => poll.id);
      return Object.assign({}, state, {status: constants.COMMON.NORMAL, list: list});
    default:
      return state;
  }
}

export default pollsList;