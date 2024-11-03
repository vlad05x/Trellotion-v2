import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './reducer';
import { boardReducer } from './boardReducer'; 

const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


