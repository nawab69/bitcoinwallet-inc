import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "../component/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { fetchChat } from "../actions/chatActions";
import { getSingleTradeDetails } from "../actions/tradeActions";
import io from "socket.io-client";
import TradeActions from "../component/TradeActions";
import Loader from "../component/Loader";
import { NavBar } from "../component/dashboard";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const ENDPOINT = "/";

const TradeDetails = ({ match }) => {
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
    userInfo: { email, _id, token },
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

  const publishReview = async (e) => {
    e.preventDefault();
    const { rating, comment } = state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "/api/review/create",
        {
          tradeId: singleTradeDetails?.id,
          star: rating,
          review: comment,
        },
        config
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setstate({ ...state, [name]: value });
  };

  const startTrade = (e) => {
    e.preventDefault();
    alert("Trade started");
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
                  className="border border-1 text-sm bg-green-300 px-2 py-1 inline-block rounded-br-xl rounded-tl-sm shadow text-white"
                  style={{
                    height: "fit-content",
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
            <div className="text-end my-3 flex flex-row-reverse">
              <i class="fa fa-user" aria-hidden="true"></i>&ensp;
              <span
                className="border border-1 text-start text-sm bg-gray-50 px-2 py-1 rounded-bl-xl rounded-tr-lg shadow"
                style={{
                  height: "fit-content",
                }}
              >
                {chat.message}
              </span>
            </div>
          );
        }
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <div className="w-full min-h-screen dashboard">
        <div className="container pt-24 pb-8">
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full lg:w-86 px-2 bg-white mb-8 lg:mb-0">
              <div className="h3 text-center pt-3 text-indigo-500">Details</div>
              {singleTradeDetails && (
                <>
                  <div>
                    <TradeActions
                      buyer={singleTradeDetails.buyer.email}
                      seller={singleTradeDetails.seller.email}
                      status={singleTradeDetails.status}
                      id={singleTradeDetails.tradeId}
                    />
                  </div>

                  <div className="my-8 overflow-auto px-3">
                    <table class="items-center bg-transparent w-full">
                      <tr>
                        <td class="table-header-tw">Trade Id</td>
                        <td class="table-header-tw">
                          {singleTradeDetails.tradeId}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Trade Status</td>
                        <td class="table-list-2">
                          <span className="bg-green-300 px-2 py-1 rounded-pill text-gray-500">
                            {singleTradeDetails.status}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Trade Amount</td>
                        <td class="table-list-2">
                          {singleTradeDetails.amount}{" "}
                          {singleTradeDetails.currency}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Buyer Email</td>
                        <td class="table-list-2 lowercase font-semibold">
                          {singleTradeDetails.buyer.email}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Buyer name</td>
                        <td class="table-list-2 capitalize font-semibold">
                          {singleTradeDetails.buyer.name}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Seller Email</td>
                        <td class="table-list-2 lowercase font-semibold">
                          {singleTradeDetails.seller.email}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Seller name</td>
                        <td class="table-list-2 capitalize font-semibold">
                          {singleTradeDetails.seller.name}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-list-2">Details</td>
                        <td class="table-list-2 font-semibold">
                          {singleTradeDetails.description}
                        </td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
            </div>
            <div className="w-full lg:w-86 px-2 bg-white p-4">
              <div className="h3 text-center pt-3 text-indigo-500">Chat</div>
              <div
                className="overflow-auto d-flex flex-column-reverse"
                style={{ height: "400px" }}
              >
                {renderChat()}
              </div>
              <div className="flex justify-between mb-2">
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

            {singleTradeDetails?.status == "completed" ? (
              <div className="bg-white p-4 lg:col-span-2">
                <h1 className="text-center">Feedback</h1>
                <p className="text-lg text-center">How was you experience?</p>

                <div>
                  <form method="post" name="myForm" className="w-full">
                    <div className="flex justify-center">
                      <div className="w-full px-12 py-4">
                        <div className="mb-4">
                          <input
                            type="radio"
                            name="rating"
                            id="first"
                            value="1"
                            onChange={handleChange}
                          />
                          <label for="first">
                            <FaStar className="text-yellow-400 text-lg mx-1" />
                          </label>

                          <br />

                          <input
                            type="radio"
                            name="rating"
                            id="second"
                            value="2"
                            onChange={handleChange}
                          />
                          <label for="second">
                            <div className="flex">
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                            </div>
                          </label>

                          <br />

                          <input
                            type="radio"
                            name="rating"
                            id="third"
                            value="3"
                            onChange={handleChange}
                          />
                          <label for="third">
                            <div className="flex">
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                            </div>
                          </label>

                          <br />

                          <input
                            type="radio"
                            name="rating"
                            id="fourth"
                            value="4"
                            onChange={handleChange}
                          />
                          <label for="fourth">
                            <div className="flex">
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                            </div>
                          </label>

                          <br />

                          <input
                            type="radio"
                            name="rating"
                            id="fifth"
                            value="5"
                            onChange={handleChange}
                          />
                          <label for="fifth">
                            <div className="flex">
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                              <FaStar className="text-yellow-400 text-lg mx-1" />
                            </div>
                          </label>
                        </div>

                        <div className="mb-4">
                          <label
                            for="comment"
                            className="text-muted form-label"
                          >
                            Tell us what you think. Leave a feedback
                          </label>
                          <textarea
                            id="comment"
                            placeholder="Comment here..."
                            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            rows="4"
                            style={{ fontSize: 14 }}
                            onChange={(e) => {
                              setstate({ ...state, comment: e.target.value });
                            }}
                          ></textarea>
                        </div>

                        <div className="text-center mb-4">
                          <Button onClick={publishReview}>Publish</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeDetails;
