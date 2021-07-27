import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userReducer,
  userRegReducer,
  userUpdateByAdminReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  singleTrade,
  Trades,
  BalancesReducer,
  TRANSFER,
  statusReducer,
  singleTradeDetails,
} from "./reducers/tradeReducer";
import { chatReducers } from "./reducers/chatReducers";
import { AdminTradesList, countList } from "./reducers/adminReducers";

const reducer = combineReducers({
  userLogin: userReducer,
  userReg: userRegReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,

  trade: singleTrade,
  trades: Trades,
  adminTradesList: AdminTradesList,
  transfer: TRANSFER,
  balances: BalancesReducer,
  singleTrade: singleTradeDetails,
  status: statusReducer,
  chats: chatReducers,
  count: countList,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
