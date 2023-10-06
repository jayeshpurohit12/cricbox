import * as Types from "../actions/types";
import { User } from "../interfaces/User";

let globalStates = {
  darkThemeEnabled: false,
  userDetails: {},
  isSubmit: false,
  userData: {},
} as User;

const userReducer = (state = globalStates, actionData: any) => {
  switch (actionData.type) {
    case Types.SET_THEME:
      return {
        ...state,
        darkThemeEnabled: actionData.theme,
      };
    case Types.LOAD_USER_DATA:
      return {
        ...state,
        userData: actionData.userData,
      };
    case Types.USER_DETAILS:
      return {
        ...state,
        userDetails: actionData.userDetails,
      };
    default:
      return state;
  }
};

export default userReducer;
