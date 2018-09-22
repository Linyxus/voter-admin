import { http, authedGet } from "./requests";
import { saveCreds, isExpired } from "./tools";

export const SET_PAGE = 'SET_PAGE';
export const setPage = (page) => ({
  type: SET_PAGE,
  page: page,
});

export const AUTH_SUCCEED = 'AUTH_SUCCEED';
export const authSucceed = (username) => ({
  type: AUTH_SUCCEED,
  username,
});

export const AUTH_FAIL = 'AUTH_FAIL';
export const authFail = (err) => ({
  type: AUTH_FAIL,
  error: err,
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = (username) => ({
  type: AUTH_REQUEST,
  username,
});

export const CHECK_REQUEST = 'CHECK_REQUEST';
export const checkRequest = () => ({
  type: CHECK_REQUEST,
});

export const loginAsSuperuser = (username, password) => dispatch => {
  dispatch(authRequest(username));
  http.post('/auth/token/', {username, password})
    .then(
      resp => {
        saveCreds(username, resp.data.refresh);
        dispatch(checkRequest());
        authedGet('/admin/is_superuser/')
          .then(
            resp => {
              if (resp.data['is_superuser?']) {
                dispatch(authSucceed(username));
              } else {
                dispatch(authFail('You are not superuser.'));
              }
            },
            error => {
              dispatch(authFail(error.response || error.request));
            }
          )
      },
      error => {
        dispatch(authFail(error.response || error.request));
      }
    );
}