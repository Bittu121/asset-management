import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../auth/authReducer";
import locationReducer from "../location/locationReducer";
import subLocationReducer from "../subLocation/subLocationReducer";
import departmentReducer from "../department/departmentReducer";
import subDepartmentReducer from "../subDepartment/subDepartmentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  subLocation: subLocationReducer,
  department: departmentReducer,
  subDepartment: subDepartmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
