import { CHAT_FETCH_FAIL, CHAT_FETCH_REQUEST, CHAT_FETCH_RESET, CHAT_FETCH_SUCCESS } from "../types/chatTypes"

export const chatReducers = (state = {}, action) => {
    switch (action.type) {
        case CHAT_FETCH_REQUEST:
            return { loading: true }
        case CHAT_FETCH_SUCCESS:
            return { loading: false, success: true, chats: action.payload }
        case CHAT_FETCH_FAIL:
            return { loading: false, error: action.payload }
        case CHAT_FETCH_RESET:
            return {}
        default:
            return state
    }
}

