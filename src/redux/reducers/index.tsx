import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import SlotReducer from "./SlotReducer";

export default combineReducers({
  userReducer,
  SlotReducer,
});
