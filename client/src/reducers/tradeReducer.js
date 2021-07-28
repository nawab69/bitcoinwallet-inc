import {
  BALANCE_FETCH_FAIL,
  BALANCE_FETCH_REQUEST,
  BALANCE_FETCH_SUCCESS,
  BALANCE_RESET,
  CHANGE_TRADE_FAIL,
  CHANGE_TRADE_REQUEST,
  CHANGE_TRADE_RESET,
  CHANGE_TRADE_SUCCESS,
  SINGLE_TRADE_FAIL,
  SINGLE_TRADE_REQUEST,
  SINGLE_TRADE_RESET,
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

export const singleTrade = (state = {}, action) => {
  switch (action.type) {
    case TRADE_CREATE_REQUEST:
      return { loading: true };
    case TRADE_CREATE_SUCCESS:
      return { loading: false, success: true, trade: action.payload };
    case TRADE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Trades = (state = {}, action) => {
  // const { trades, page, pages } = action.payload;
  console.log(action.payload);
  switch (action.type) {
    case TRADE_FETCH_REQUEST:
      return { loading: true };
    case TRADE_FETCH_SUCCESS:
      return {
        loading: false,
        success: true,
        trades: action.payload.trades,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case TRADE_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const BalancesReducer = (state = {}, action) => {
  switch (action.type) {
    case BALANCE_FETCH_REQUEST:
      return { loading: true };
    case BALANCE_FETCH_SUCCESS:
      return { loading: false, success: true, balances: action.payload };
    case BALANCE_FETCH_FAIL:
      return { loading: false, error: action.payload };
    case BALANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const TRANSFER = (state = {}, action) => {
  switch (action.type) {
    case TRANSFER_REQUEST:
      return { loading: true };
    case TRANSFER_SUCCESS:
      return { loading: false, success: true };
    case TRANSFER_FAIL:
      return { loading: false, error: action.payload };
    case TRANSFER_RESET:
      return {};
    default:
      return state;
  }
};

// export const SINGLE_TRADE_REQUEST = "SINGLE_TRADE_REQUEST";
// export const SINGLE_TRADE_SUCCESS = "SINGLE_TRADE_SUCCESS";
// export const SINGLE_TRADE_FAIL = "SINGLE_TRADE_FAIL";
// export const SINGLE_TRADE_RESET = "SINGLE_TRADE_RESET";

export const singleTradeDetails = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_TRADE_REQUEST:
      return { loading: true };
    case SINGLE_TRADE_SUCCESS:
      return {
        loading: false,
        success: true,
        singleTradeDetails: action.payload,
      };
    case SINGLE_TRADE_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_TRADE_RESET:
      return {};
    default:
      return state;
  }
};

export const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_TRADE_REQUEST:
      return { loading: true };
    case CHANGE_TRADE_SUCCESS:
      return { loading: false, success: true };
    case CHANGE_TRADE_FAIL:
      return { loading: false, error: action.payload };
    case CHANGE_TRADE_RESET:
      return {};
    default:
      return state;
  }
};
