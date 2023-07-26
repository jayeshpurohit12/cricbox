import * as Types from "./types";

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

export const setSelectedSlotSession = (slotSession: any) => {
  return {
    type: Types.SET_SELECTED_SLOT_SESSION,
    slotSession,
  };
};

export const setFilterTurfSize = (turfSizes: any[]) => {
  return {
    type: Types.SET_FILTER_TURF_SIZE,
    turfSizes,
  };
};

export const setFilterPrice = (price: any) => {
  return {
    type: Types.SET_FILTER_PRICE,
    price,
  };
};

export const setFilterSlots = (slots: any) => {
  return {
    type: Types.SET_FILTER_SLOTS,
    slots,
  };
};

export const setFilterStartTime = (startTime: any) => {
  return {
    type: Types.SET_FILTER_START_TIME,
    startTime,
  };
};

export const setFilterEndTime = (endTime: any) => {
  return {
    type: Types.SET_FILTER_END_TIME,
    endTime,
  };
};
