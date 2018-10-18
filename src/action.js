import { http, authedGet, authedPost } from './requests';
import { saveCreds, clearCreds } from './tools';

const extractError = (error) => {
  if (error.response) {
    return JSON.stringify(error.response.data);
  } else {
    return JSON.stringify('Network error.');
  }
}

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
                dispatch(openSnackbar(`Welcome, ${username}.`));
              } else {
                dispatch(authFail('You are not superuser.'));
                clearCreds();
                dispatch(openSnackbar(`Sorry, ${username}. You are not superuser.`));
              }
            },
            error => {
              dispatch(authFail(error.response || error.request));
              dispatch(openSnackbar(`Login failed: ${extractError(error)}`));
            }
          )
      },
      error => {
        dispatch(authFail(error.response || error.request));
        dispatch(openSnackbar(`Login failed: ${extractError(error)}`));
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
    );
};

export const TOGGLE_POLL = 'TOGGLE_POLL';
export const togglePoll = (id) => ({
  type: TOGGLE_POLL,
  id,
});

export const TOGGLE_OPTION = 'TOGGLE_OPTION';
export const toggleOption = (pollId, optionId) => ({
  type: TOGGLE_OPTION,
  pollId, optionId,
})

export const VALIDATE_POLL_REQUEST = 'VALIDATE_POLL_REQUEST';
export const validatePollRequest = (pollId) => ({
  type: VALIDATE_POLL_REQUEST,
  pollId,
});

export const VALIDATE_POLL_FAIL = 'VALIDATE_POLL_FAIL';
export const validatePollFail = (pollId, error) => ({
  type: VALIDATE_POLL_FAIL,
  pollId, error,
});

export const VALIDATE_POLL_SUCCEED = 'VALIDATE_POLL_SUCCEED';
export const validatePollSucceed = (pollId) => ({
  type: VALIDATE_POLL_SUCCEED,
  pollId,
});

export const validatePoll = (pollId, data) => dispatch => {
  dispatch(validatePollRequest(pollId));
  let params = {};
  params.id = pollId;
  params.passed = data.validated;
  params.options = data.options;
  authedPost('/admin/validation/polls/', params)
    .then(
      resp => {
        // TODO: fix bugs in the backend
        dispatch(validatePollSucceed(pollId));
      },
      error => {
        dispatch(validatePollFail(pollId, error.response || error.request));
      }
    );
};

export const OPEN_SNACKBAR = 'TOAST';
export const openSnackbar = (text, duration = 6000) => ({
  type: OPEN_SNACKBAR,
  text, duration,
});

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});
