import {
  GET_AUTHORIZATION_TOKEN_SUCCESS,
  GET_AUTHORIZATION_TOKEN_FAILED,
  POST_RECEPTION_REGISTER_FAILED,
  POST_RECEPTION_REGISTER_SUCCESS,
  GET_RECEPTION_LOGIN_SUCCESS,
  GET_RECEPTION_LOGIN_FAILED,
} from "../actions/index";

const INITIAL_STATE = {
  auth_token: "",
  login_user:"",
  login_token:"",
  register:"",
  login:"",
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case GET_AUTHORIZATION_TOKEN_SUCCESS: {
      return {
        ...state,
        auth_token: action.payload,
      };
    }
    case GET_AUTHORIZATION_TOKEN_FAILED: {
      return {
        ...state,
        auth_token: action,
      };
    }
    case POST_RECEPTION_REGISTER_SUCCESS: {
      return {
        ...state,
        register: action,
      };
    }
    case POST_RECEPTION_REGISTER_FAILED: {
      return {
        ...state,
        register: action,
      };
    }
    case GET_RECEPTION_LOGIN_SUCCESS: {
      return {
        ...state,
        login_user:action.payload.user,
        login_token:action.payload.token,
      };
    }
    case GET_RECEPTION_LOGIN_FAILED: {
      return {
        ...state,
        login: action,
      };
    }
    default:
      return state;
  }
};
