import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import reducer from './reducers/reducer';
import auth from './reducers/auth';

// create a makeStore function
const makeStore = (context) => createStore(combineReducers({ reducer, auth }));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
