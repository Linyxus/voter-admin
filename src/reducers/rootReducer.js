import { combineReducers } from 'redux';
import page from './page';
import auth from './auth';
import pollsList from './pollsList';

const rootReducer = combineReducers(
  {
    auth, page, pollsList,
  }
);

export default rootReducer;