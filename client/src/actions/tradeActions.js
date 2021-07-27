import axios from "axios";
import {
  BALANCE_FETCH_FAIL,
  BALANCE_FETCH_REQUEST,
  BALANCE_FETCH_SUCCESS,
  CHANGE_TRADE_FAIL,
  CHANGE_TRADE_REQUEST,
  CHANGE_TRADE_RESET,
  CHANGE_TRADE_SUCCESS,
  SINGLE_TRADE_FAIL,
  SINGLE_TRADE_REQUEST,
  SINGLE_TRADE_SUCCESS,
  TRADE_CREATE_FAIL,
  TRADE_CREATE_REQUEST,
  TRADE_CREATE_SUCCESS,
  TRADE_FETCH_FAIL,
  TRADE_FETCH_REQUEST,
  TRADE_FETCH_SUCCESS,
  TRANSFER_FAIL,
  TRANSFER_REQUEST,
  TRANSFER_RESET,
  TRANSFER_SUCCESS,
} from "../types/tradeTypes";

export const CreateTrade =
  (amount, currency, description, buyerEmail) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRADE_CREATE_REQUEST,
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

      const { data } = await axios.post(
        "/api/trade",
        { amount, currency, description, buyerEmail },
        config
      );
      console.log(data);
      dispatch({
        type: TRADE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRADE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allTrade = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRADE_FETCH_REQUEST,
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

    const { data } = await axios.get(`/api/trade/show?page=${page}`, config);
    console.log(data);
    dispatch({
      type: TRADE_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRADE_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const SINGLE_TRADE_REQUEST = "SINGLE_TRADE_REQUEST";
// export const SINGLE_TRADE_SUCCESS = "SINGLE_TRADE_SUCCESS";
// export const SINGLE_TRADE_FAIL = "SINGLE_TRADE_FAIL";
// export const SINGLE_TRADE_RESET = "SINGLE_TRADE_RESET";

export const getSingleTradeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SINGLE_TRADE_REQUEST,
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

    const { data } = await axios.get(`/api/trade/${id}`, config);
    dispatch({
      type: SINGLE_TRADE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_TRADE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Balances = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BALANCE_FETCH_REQUEST,
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

    const { data } = await axios.get("/api/wallet", config);
    dispatch({
      type: BALANCE_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BALANCE_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const TRANSFER =
  (recipient, currency, amount, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSFER_REQUEST,
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

      const { data } = await axios.post(
        "/api/wallet/send",
        { recipient, currency, amount, password },
        config
      );

      dispatch({
        type: TRANSFER_SUCCESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({
          type: TRANSFER_RESET,
        });
      }, 3000);
    } catch (error) {
      dispatch({
        type: TRANSFER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: TRANSFER_RESET });
      }, 3000);
    }
  };

export const changeTradeStatus =
  (action, tradeId, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_TRADE_REQUEST,
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

      const { data } = await axios.post(
        `/api/trade/${action}/${tradeId}`,
        { password },
        config
      );

      console.log(data);

      dispatch({
        type: CHANGE_TRADE_SUCCESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({
          type: CHANGE_TRADE_RESET,
        });
      }, 3000);
    } catch (error) {
      dispatch({
        type: CHANGE_TRADE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      console.log(error);

      setTimeout(() => {
        dispatch({
          type: CHANGE_TRADE_RESET,
        });
      }, 3000);
    }
  };
