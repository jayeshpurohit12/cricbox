import { connect } from "react-redux";
import { setTheme, loadUserData } from "../actions/actions";

const connectStore = (component) => {
  return connect(
    (state: any) => {
      return {
        darkThemeEnabled: state.userReducer.darkThemeEnabled,
        userData: state.userReducer.userData,
      };
    },
    (dispatch: any, ownprops: any) => {
      return {
        setTheme: (value: boolean) => dispatch(setTheme(value)),
        loadUserData: (userData: any) => dispatch(loadUserData(userData)),
      };
    },
  )(component);
};

export default connectStore;
