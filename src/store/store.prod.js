import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import tokenChecker from '../middlewares/tokenChecker';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    tokenChecker,
  )
);

export default store;