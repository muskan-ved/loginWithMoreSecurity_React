import { API } from "src/config/config";
import axios from "axios";
import { GET_RECEPTIONIST_BY_ID_FAILED, GET_RECEPTIONIST_BY_ID_SUCCESS, PUT_RECEPTIONIST_EDIT_FAILED, PUT_RECEPTIONIST_EDIT_SUCCESS } from "./index";
import { authHeader } from "src/common/header";

  export const RECEPTIONIST_BY_ID = (data,callback) => {

    const request = axios({
        method: "get",
        url: `${API.receiptionistList}/${data.id}`,
        headers: authHeader(data),
    });
    
    return async (dispatch) => {
        await request
        .then((res) => {
            callback(res)
          dispatch({
            type: GET_RECEPTIONIST_BY_ID_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
            callback(err)
          dispatch({
            type: GET_RECEPTIONIST_BY_ID_FAILED,
            payload: err,
          });
        });
    };
  };
  

export const RECEPTIONIST_UPDATE = (data,callback) => {
  const request = axios({
    method: "put",
    url: `${API.receiptionistEdit}/${data.id}`,
    data: data.payload,
    headers: authHeader(data),
  });

  return async (dispatch) => {
    await request
      .then((res) => {
        callback(res);
        dispatch({
          type: PUT_RECEPTIONIST_EDIT_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        callback(err);
        dispatch({
          type: PUT_RECEPTIONIST_EDIT_FAILED,
          payload: err,
        });
      });
  };
};

