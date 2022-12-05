import { API } from "src/config/config";
import axios from "axios";
import {
  GET_AUTHORIZATION_TOKEN_FAILED,
  GET_AUTHORIZATION_TOKEN_SUCCESS,
  GET_RECEPTION_LOGIN_FAILED,
  GET_RECEPTION_LOGIN_SUCCESS,
  POST_RECEPTION_REGISTER_FAILED,
  POST_RECEPTION_REGISTER_SUCCESS,
} from "./index";
import { appAuthHeader } from "src/common/header";

export const AUTHORIZATION_TOKEN = () => {
  return (dispatch) => {
    axios
      .get(API.generateToken)
      .then((res) => {
        dispatch({
          type: GET_AUTHORIZATION_TOKEN_SUCCESS,
          payload: res.data.AuthorizationToken,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_AUTHORIZATION_TOKEN_FAILED,
          payload: err,
        });
      });
  };
};

export const RECEPTION_REGISTER = (data, callback) => {
  const request = axios({
    method: "post",
    url: `${API.receiptionRegister}`,
    data: data.payload,
    headers: appAuthHeader(data.header),
  });

  return async (dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: POST_RECEPTION_REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: POST_RECEPTION_REGISTER_FAILED,
          payload: err,
        });
      });
  };
};

export const RECEPTION_LOGIN = (data, callback) => {
  const request = axios({
    method: "post",
    url: `${API.receiptionLogin}`,
    data: data.payload,
    headers: appAuthHeader(data.header),
  });

  return async (dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: GET_RECEPTION_LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: GET_RECEPTION_LOGIN_FAILED,
          payload: err,
        });
      });
  };
};

export const RECEPTION_LOGOUT = () => {

  window.localStorage.clear()
  window.location.replace('/login')

};
