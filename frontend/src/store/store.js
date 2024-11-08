import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from "./reducer";
import { boardReducer } from "./boardReducer";
import { taskReducer } from "./taskReducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'boards', 'tasks']
};

const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardReducer,
  tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };