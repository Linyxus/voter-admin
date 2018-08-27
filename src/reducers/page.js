import constants from '../constants';
import { SET_PAGE } from '../action';

const page = (state = constants.PAGE.OVERVIEW, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.page;
    default:
      return state;
  }
}

export default page;