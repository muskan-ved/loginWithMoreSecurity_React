import {

    GET_VISITOR_LIST_SUCCESS,
    GET_VISITOR_LIST_FAILED,
    PUT_VISITOR_EDIT_SUCCESS,
    PUT_VISITOR_EDIT_FAILED,
    GET_VISITOR_LIST_BY_ID_SUCCESS,
    GET_VISITOR_LIST_BY_ID_FAILED,
  } from "../actions/index";
  
  const INITIAL_STATE = {
    visitor_list: "",
    visitor_by_id: "",
    visitor_updated: "",
  };
  
  export default (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
      case GET_VISITOR_LIST_SUCCESS: {
        return {
          ...state,
          visitor_list: action.payload,
        };
      }
      case GET_VISITOR_LIST_FAILED: {
        return {
          ...state,
          visitor_list: action,
        };
      }
      case GET_VISITOR_LIST_BY_ID_SUCCESS: {
        return {
          ...state,
          visitor_by_id: action.payload,
        };
      }
      case GET_VISITOR_LIST_BY_ID_FAILED: {
        return {
          ...state,
          visitor_by_id: action,
        };
      }
      case PUT_VISITOR_EDIT_SUCCESS: {
        return {
          ...state,
          visitor_updated: action,
        };
      }
      case PUT_VISITOR_EDIT_FAILED: {
        return {
          ...state,
          visitor_updated: action,
        };
      }
      default:
        return state;
    }
  };
  