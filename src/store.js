import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import createHistory from 'history/createBrowserHistory';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';

export const history = createHistory();

const reducer = combineReducers({
    auth,
    common,
    home,
    settings
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);
export const store = createStore(reducer, middleware);

