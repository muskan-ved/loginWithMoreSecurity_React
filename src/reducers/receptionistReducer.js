import { GET_RECEPTIONIST_BY_ID_FAILED, GET_RECEPTIONIST_BY_ID_SUCCESS, PUT_RECEPTIONIST_EDIT_FAILED, PUT_RECEPTIONIST_EDIT_SUCCESS } from "../actions/index";
  
  const INITIAL_STATE = {
    receptionist_by_id: "",
    receptionist_updated: "",
  };
  
  export default (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
      case GET_RECEPTIONIST_BY_ID_SUCCESS: {
        return {
          ...state,
          receptionist_by_id: action.payload,
        };
      }
      case GET_RECEPTIONIST_BY_ID_FAILED: {
        return {
          ...state,
          receptionist_by_id: action,
        };
      }
      case PUT_RECEPTIONIST_EDIT_SUCCESS: {
        return {
          ...state,
          receptionist_updated: action,
        };
      }
      case PUT_RECEPTIONIST_EDIT_FAILED: {
        return {
          ...state,
          receptionist_updated: action,
        };
      }
      default:
        return state;
    }
  };
  