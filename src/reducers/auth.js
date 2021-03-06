import constants from "../constants";
import { AUTH_SUCCEED, AUTH_FAIL, AUTH_REQUEST, LOG_OUT } from "../action";

const auth = (state = {status: constants.AUTH.UNAUTHED, username: null}, action) => {
  switch (action.type) {
    case AUTH_SUCCEED:
      return {status: constants.AUTH.AUTHED, username: action.username};
    case AUTH_REQUEST:
      return {status: constants.AUTH.AUTHING, username: null};
    case AUTH_FAIL:
      return {status: constants.AUTH.UNAUTHED, username: null};
    case LOG_OUT:
      return {status: constants.AUTH.UNAUTHED, username: null};
    default:
      return state;
  }
}

export default auth;