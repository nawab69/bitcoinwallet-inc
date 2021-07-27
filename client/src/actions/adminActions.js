import axios from "axios";
import {
  ADMIN_COUNT_FETCH_REQUEST,
  ADMIN_COUNT_FETCH_SUCCESS,
  ADMIN_TRADES_FETCH_FAIL,
  ADMIN_TRADES_FETCH_REQUEST,
  ADMIN_TRADES_FETCH_SUCCESS,
} from "../types/adminTypes";

export const fetchAdminTrades = (queryString) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_TRADES_FETCH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/trades${queryString}`, config);

    dispatch({
      type: ADMIN_TRADES_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TRADES_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchCount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_COUNT_FETCH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/count`, config);

    dispatch({
      type: ADMIN_COUNT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TRADES_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
