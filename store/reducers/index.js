import authReducer from "./auth-reducer";
const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
