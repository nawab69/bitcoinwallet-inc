import {
  ADMIN_COUNT_FETCH_FAIL,
  ADMIN_COUNT_FETCH_REQUEST,
  ADMIN_COUNT_FETCH_SUCCESS,
  ADMIN_TRADES_FETCH_FAIL,
  ADMIN_TRADES_FETCH_REQUEST,
  ADMIN_TRADES_FETCH_SUCCESS,
} from "../types/adminTypes";

export const AdminTradesList = (state = {}, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ADMIN_TRADES_FETCH_REQUEST:
      return { loading: true };
    case ADMIN_TRADES_FETCH_SUCCESS:
      return {
        loading: false,
        success: true,
        trades: action.payload.trades,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case ADMIN_TRADES_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const countList = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COUNT_FETCH_REQUEST:
      return { loading: true };
    case ADMIN_COUNT_FETCH_SUCCESS:
      return {
        loading: false,
        success: true,
        count: action.payload,
      };
    case ADMIN_COUNT_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
