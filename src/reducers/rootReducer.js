import { combineReducers } from 'redux';
import page from './page';
import auth from './auth';
import pollsList from './pollsList';
import polls from './polls';

const rootReducer = combineReducers(
  {
    auth, page, pollsList,
    polls, 
  }
);

export default rootReducer;