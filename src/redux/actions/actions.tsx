import * as Types from './types';

// REGISTRATION FIRST STEP
export const createUser = (userData: any) => {
  return {
    type: Types.CREATE_USER,
    userData,
  };
};

export const setTheme = (theme: boolean) => {
  return {
    type: Types.SET_THEME,
    theme,
  };
};

export const getUserById = (userData: any) => {
  return {
    type: Types.GET_USER_BY_ID,
    userData,
  };
};

export const loadUserData = (userData: any) => {
  return {
    type: Types.LOAD_USER_DATA,
    userData,
  };
};

export const setAlert = (
  value: boolean,
  alertType?: string,
  alertTitle?: string,
) => {
  return {
    type: Types.SET_ALERT,
    value,
    alertType,
    alertTitle,
  };
};

export const setCircularBtn = (value: boolean) => {
  return {
    type: Types.SHOW_CIRCULAR_BTN,
    value,
  };
};
