import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import tokenChecker from '../middlewares/tokenChecker';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
    tokenChecker,
  )
);

export default store;
