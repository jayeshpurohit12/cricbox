import * as Types from "../actions/types";

const initialState = {
  slotSession: {},
};
const SlotReducer = (state = initialState, actionData: any) => {
  switch (actionData.type) {
    case Types.SET_SELECTED_SLOT_SESSION:
      return {
        ...state,
        slotSession: actionData.slotSession,
      };

    default:
      return state;
  }
};

export default SlotReducer;
