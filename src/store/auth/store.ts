import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../auth/authReducer";
import locationReducer from "../location/locationReducer";
import subLocationReducer from "../subLocation/subLocationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  subLocation: subLocationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
