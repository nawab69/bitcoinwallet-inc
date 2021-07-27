import axios from "axios";
import {
  CHAT_FETCH_FAIL,
  CHAT_FETCH_REQUEST,
  CHAT_FETCH_SUCCESS,
} from "../types/chatTypes";

export const fetchChat = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAT_FETCH_REQUEST,
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

    const { data } = await axios.get(`/api/messages/${id}`, config);
    dispatch({
      type: CHAT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
