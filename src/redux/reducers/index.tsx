import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import SlotReducer from "./SlotReducer";
import FilterReducer from "./FilterReducer";

export default combineReducers({
  userReducer,
  SlotReducer,
  FilterReducer,
});
