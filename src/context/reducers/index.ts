import { InitialState } from "context/states";

export const reducers = (state: InitialState, action: any) => {
  switch (action.type) {
    case "SAVE_METAMASK_INFO":
      return {
        ...state,
        metamask_information: action.payload,
      };
    case "DISCONNECT_METAMASK":
      return {
        ...state,
        metamask_information: action.payload,
      };
    default:
      return state;
  }
};
