import * as Types from "../actions/types";

const initialState = {
  turfSize: [],
  price: [],
  rating: [],
  slots: [],
  startTime: [],
  endTime: [],
  selectedTurfSize: "",
  selectedPrice: "",
  selectedStartTime: "",
  selectedEndTime: "",
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
    case Types.SET_SELECTED_TURF_SIZE:
      return {
        ...state,
        selectedTurfSize: actionData.selectedTurfSize,
      };
    case Types.SET_SELECTED_PRICE:
      return {
        ...state,
        selectedPrice: actionData.selectedPrice,
      };
    case Types.SET_SELECTED_START_TIME:
      return {
        ...state,
        selectedStartTime: actionData.selectedStartTime,
      };
    case Types.SET_SELECTED_END_TIME:
      return {
        ...state,
        selectedEndTime: actionData.selectedEndTime,
      };

    default:
      return state;
  }
};

export default FilterReducer;
