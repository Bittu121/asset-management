import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../auth/authReducer";
import rolesReducer from "../roles/rolesReducer";
import userAccountsReducer from "../userAccounts/userAccountsReducer";
import supportGroupsReducer from "../supportGroups/supportGroupsReducer";
import locationReducer from "../location/locationReducer";
import subLocationReducer from "../subLocation/subLocationReducer";
import departmentReducer from "../department/departmentReducer";
import subDepartmentReducer from "../subDepartment/subDepartmentReducer";
import assetCategoriesReducer from "../assetCategories/assetCategoriesReducer";
import subCategoriesReducer from "../subCategories/subCategoriesReducer";
import assetTypesReducer from "../assetTypes/assetTypesReducer";
import vendorReducer from "../vendor/vendorReducer";
import allocationReducer from "../allocations/allocationReducer";
import assetsReducer from "../assets/assetsReducer";
import gatePassReducer from "../gatePasses/gatePassReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  userAccounts: userAccountsReducer,
  supportGroups: supportGroupsReducer,
  location: locationReducer,
  subLocation: subLocationReducer,
  department: departmentReducer,
  subDepartment: subDepartmentReducer,
  assetCategories: assetCategoriesReducer,
  subCategories: subCategoriesReducer,
  assetTypes: assetTypesReducer,
  vendor: vendorReducer,
  assets: assetsReducer,
  allocations: allocationReducer,
  gatePasses: gatePassReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
