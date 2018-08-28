import { combineReducers } from 'redux';
import page from './page';
import auth from './auth';

const rootReducer = combineReducers(
  {
    auth, page
  }
);

export default rootReducer;