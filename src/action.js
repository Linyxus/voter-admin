import { http, authedGet } from './requests';
import { saveCreds, clearCreds } from './tools';

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

export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const fetchListRequest = () => ({
  type: FETCH_LIST_REQUEST,
});

export const FETCH_LIST_FAIL = 'FETCH_LIST_FAIL';
export const fetchListFail = (error) => ({
  type: FETCH_LIST_FAIL,
  error,
});

export const FETCH_LIST_SUCCEED = 'FETCH_LIST_SUCCEED';
export const fetchListSucceed = (polls) => ({
  type: FETCH_LIST_SUCCEED,
  polls,
});

export const fetchList = () => dispatch => {
  dispatch(fetchListRequest());
  authedGet('/admin/validation/polls/')
    .then(
      resp => {
        dispatch(fetchListSucceed(resp.data.polls));
      },
      error => {
        dispatch(fetchListFail(error.response || error.request));
      }
    );
}

export const LOG_OUT = 'LOG_OUT';
export const logout = () => ({
  type: LOG_OUT,
});

export const doLogout = () => dispatch => {
  clearCreds();
  dispatch(logout());
}

export const FETCH_POLL_REQUEST = 'FETCH_POLL_REQUEST';
export const fetchPollRequest = (id) => ({
  type: FETCH_POLL_REQUEST,
  id,
});

export const FETCH_POLL_SUCCEED = 'FETCH_POLL_SUCCEED';
export const fetchPollSucceed = (poll) => ({ // poll id is included in {poll}
  type: FETCH_POLL_SUCCEED,
  poll,
});

export const FETCH_POLL_FAIL = 'FETCH_POLL_FAIL';
export const fetchPollFail = (id, error) => ({
  type: FETCH_POLL_FAIL,
  id, error,
});

export const fetchPoll = (id) => dispatch => {
  dispatch(fetchPollRequest(id));
  http.get(`/polls/${id}/`)
    .then(
      resp => {
        dispatch(fetchPollSucceed(resp.data));
      },
      error => {
        dispatch(fetchPollFail(error.response || error.request));
      }
    )
}

export const FETCH_OPTION_REQUEST = 'FETCH_OPTION_REQUEST';
export const fetchOptionRequest = (id) => ({
  type: FETCH_OPTION_REQUEST,
  id,
});

export const FETCH_OPTION_SUCCEED = 'FETCH_OPTION_SUCCEED';
export const fetchOptionSucceed = (option) => ({ // option id is included in {poll}
  type: FETCH_OPTION_SUCCEED,
  option,
});

export const FETCH_OPTION_FAIL = 'FETCH_OPTION_FAIL';
export const fetchOptionFail = (id, error) => ({
  type: FETCH_OPTION_FAIL,
  id, error,
});

export const fetchOption = (id) => dispatch => {
  dispatch(fetchOptionRequest(id));
  http.get(`/options/${id}/`)
    .then(
      resp => {
        dispatch(fetchOptionSucceed(resp.data));
      },
      error => {
        dispatch(fetchOptionFail(error.response || error.request));
      }
    )
}
