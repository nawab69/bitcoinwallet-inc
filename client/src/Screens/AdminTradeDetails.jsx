import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat } from "../actions/chatActions";
import { getSingleTradeDetails } from "../actions/tradeActions";
import io from "socket.io-client";
import TradeActions from "../component/TradeActions";
import AdminTradeActions from "../component/AdminTradeActions";
import Loader from "../component/Loader";

const ENDPOINT = "/";

const AdminTradeDetails = ({ match, history }) => {
  const socketRef = useRef();
  const [state, setstate] = useState({});

  const tradeId = match.params.id;
  const dispatch = useDispatch();
  const { success, loading, singleTradeDetails, error } = useSelector(
    (state) => state.singleTrade
  );

  const {
    success: chatSuccess,
    loading: chatLoading,
    chats,
    error: chatError,
  } = useSelector((state) => state.chats);
  const {
    userInfo: { email, _id },
  } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(getSingleTradeDetails(tradeId));
    dispatch(fetchChat(tradeId));
    socketRef.current = io.connect(ENDPOINT);
    socketRef.current.on(`message-${tradeId}`, (msg) => {
      dispatch(fetchChat(tradeId));
    });
  }, []);

  const handleClick = (e) => {
    const msg = state.message;
    const sender = _id;
    e.preventDefault();
    if (msg && sender) {
      socketRef.current.emit("message", tradeId, msg, sender);
      setstate((state) => ({ ...state, message: "" }));
    }
  };

  const renderChat = () => {
    return chats
      ?.slice(0)
      .reverse()
      .map((chat) => {
        if (chat.user.email !== email) {
          return (
            <div className="text-start my-3 d-flex">
              <i class="fa fa-user" aria-hidden="true"></i>&ensp;
              <div>
                <span
                  className="border border-1 rounded pl-2"
                  style={{
                    width: "auto",
                    height: "fit-content",
                    paddingLeft: "6px",
                    paddingRight: "6px",
                    borderRadius: "50%",
                  }}
                >
                  {chat.message}
                </span>
                <p style={{ fontSize: "10px", color: "gray" }}>
                  {chat.user.name}
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="text-end my-3 d-flex flex-row-reverse">
              <i class="fa fa-user" aria-hidden="true"></i>&ensp;
              <span
                className="border border-1 rounded pl-2 text-start"
                style={{
                  width: "auto",
                  height: "fit-content",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                  borderRadius: "50%",
                }}
              >
                {chat.message}
              </span>
            </div>
          );
        }
      });
  };

  return singleTradeDetails ? (
    <div>
      <div className="container screen">
        <div className="row mb-4 d-flex justify-content-between">
          <div className="col-sm-12 col-md-5 col-lg-5 card px-2">
            <h3 className="text-center pt-3">Details</h3>
            {singleTradeDetails && (
              <>
                <div>
                  <AdminTradeActions
                    buyer={singleTradeDetails.buyer.email}
                    seller={singleTradeDetails.seller.email}
                    status={singleTradeDetails.status}
                    id={singleTradeDetails.tradeId}
                  />
                </div>
                <p>
                  {" "}
                  <strong>Trade ID:&emsp;</strong>
                  {singleTradeDetails.tradeId}
                </p>
                <p>
                  <strong>Buyer:&emsp;</strong>
                  {singleTradeDetails.buyer.email}
                </p>
                <p>
                  <strong>Seller:&emsp;</strong>
                  {singleTradeDetails.seller.email}
                </p>
                <p>
                  <strong>Amount:&emsp;</strong>
                  {singleTradeDetails.amount} {singleTradeDetails.currency}
                </p>
                <p>
                  <strong>Status:&emsp;</strong>
                  {singleTradeDetails.status}
                </p>
                <p>
                  <strong>Details:&emsp;</strong>
                  {singleTradeDetails.description}
                </p>
              </>
            )}
          </div>
          <div className="col-sm-12 col-md-5 col-lg-5 card d-flex justify-content-between px-4">
            <h3 className="text-center pt-3">Chat</h3>
            <div
              className="overflow-auto d-flex flex-column-reverse"
              style={{ height: "350px" }}
            >
              {renderChat()}
            </div>
            <div className="d-flex justify-content-between mb-2">
              <input
                type="text"
                className="form-control"
                value={state.message}
                placeholder="Text"
                onChange={(e) =>
                  setstate((state) => ({ ...state, message: e.target.value }))
                }
                value={state.message}
              />
              <div className="px-2">
                <i class="fas fa-file-image fa-2x line"></i>
              </div>
              <div className="px-2">
                <i
                  class="fab fa-telegram-plane fa-2x line"
                  onClick={handleClick}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default AdminTradeDetails;
