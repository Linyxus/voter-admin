import { combineReducers } from 'redux';
import page from './page';
import auth from './auth';
import pollsList from './pollsList';
import polls from './polls';
import options from './options';

const rootReducer = combineReducers(
  {
    auth, page, pollsList,
    polls, options, 
  }
);

export default rootReducer;