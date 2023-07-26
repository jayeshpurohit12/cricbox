import * as Types from "../actions/types";

const initialState = {
  turfSize: [],
  price: [],
  rating: [],
  slots: [],
  startTime: [],
  endTime: [],
};
const FilterReducer = (state = initialState, actionData: any) => {
  switch (actionData.type) {
    case Types.SET_FILTER_TURF_SIZE:
      return {
        ...state,
        turfSize: actionData.turfSizes,
      };
    case Types.SET_FILTER_PRICE:
      return {
        ...state,
        price: actionData.price,
      };
    case Types.SET_FILTER_SLOTS:
      return {
        ...state,
        slots: actionData.slots,
      };
    case Types.SET_FILTER_START_TIME:
      return {
        ...state,
        startTime: actionData.startTime,
      };
    case Types.SET_FILTER_END_TIME:
      return {
        ...state,
        endTime: actionData.endTime,
      };

    default:
      return state;
  }
};

export default FilterReducer;
