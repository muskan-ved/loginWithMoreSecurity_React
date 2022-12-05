import { API } from "src/config/config";
import axios from "axios";
import {
  ALL_VISITOR_DELETE_FAILED,
  ALL_VISITOR_DELETE_SUCCESS,
    GET_VISITOR_LIST_BY_ID_FAILED,
    GET_VISITOR_LIST_BY_ID_SUCCESS,
    GET_VISITOR_LIST_FAILED,
    GET_VISITOR_LIST_SUCCESS,
    POST_VISITOR_ADD_FAILED,
  POST_VISITOR_ADD_SUCCESS,
  PUT_VISITOR_EDIT_FAILED,
  PUT_VISITOR_EDIT_SUCCESS,
  VISITOR_DELETE_FAILED,
  VISITOR_DELETE_SUCCESS,
} from "./index";
import { authHeader } from "src/common/header";

export const VISITOR_ADD = (data,callback) => {
    const request = axios({
        method: "post",
        url: `${API.visitorAdd}`,
        data: data.payload,
        headers: authHeader(data),
      });
  return async(dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: POST_VISITOR_ADD_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: POST_VISITOR_ADD_FAILED,
          payload: err,
        });
      });
  };
};

export const VISITOR_LIST = (data,callback) => {
    const request = axios({
        method: "get",
        url: `${API.visitorList}?search=${data.search}`,
        headers: authHeader(data),
    });
    
    return async (dispatch) => {
        await request
        .then((res) => {
            callback(res)
          dispatch({
            type: GET_VISITOR_LIST_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
            callback(err)
          dispatch({
            type: GET_VISITOR_LIST_FAILED,
            payload: err,
          });
        });
    };
  };

  export const VISITOR_LIST_BY_ID = (data,callback) => {

    const request = axios({
        method: "get",
        url: `${API.visitorList}/${data.id}`,
        headers: authHeader(data),
    });
    
    return async (dispatch) => {
        await request
        .then((res) => {
            callback(res)
          dispatch({
            type: GET_VISITOR_LIST_BY_ID_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
            callback(err)
          dispatch({
            type: GET_VISITOR_LIST_BY_ID_FAILED,
            payload: err,
          });
        });
    };
  };
  

export const VISITOR_UPDATE = (data, callback) => {
  const request = axios({
    method: "put",
    url: `${API.visitorEdit}/${data.id}`,
    data: data.payload,
    headers: authHeader(data),
  });

  return async (dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: PUT_VISITOR_EDIT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: PUT_VISITOR_EDIT_FAILED,
          payload: err,
        });
      });
  };
};

export const VISITOR_DELETE = (data, callback) => {
  const request = axios({
    method: "delete",
    url: `${API.visitorDelete}/${data.id}`,
    headers: authHeader(data),
  });

  return async (dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: VISITOR_DELETE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: VISITOR_DELETE_FAILED,
          payload: err,
        });
      });
  };
};

export const VISITOR_ALL_DELETE = (data, callback) => {
  const request = axios({
    method: "delete",
    url: `${API.allVisitorDelete}`,
    data: data.payload,
    headers: authHeader(data),
  });

  return async (dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: ALL_VISITOR_DELETE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: ALL_VISITOR_DELETE_FAILED,
          payload: err,
        });
      });
  };
};
