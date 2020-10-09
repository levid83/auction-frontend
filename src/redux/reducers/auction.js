import {
  GET_AUCTIONS_REQUEST,
  GET_AUCTIONS_RESPONSE,
  GET_AUCTIONS_ERROR,
  CREATE_AUCTIONS_REQUEST,
  CREATE_AUCTIONS_RESPONSE,
  CREATE_AUCTIONS_ERROR,
  PLACE_BID_REQUEST,
  PLACE_BID_RESPONSE,
  PLACE_BID_ERROR,
  SET_BIDDING_ON,
  RESET_BIDDING_ON,
  SET_BID_AMOUNT,
  AUCTION_ERROR,
} from "../actions/types";

import errorReducer from "./error";
const initialState = {
  auctions: null,
  biddingOn: null,
  bidAmount: 0,
  error: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_AUCTIONS_RESPONSE:
      const auctions = payload;
      let bidAmount = state.bidAmount;
      if (state.biddingOn) {
        auctions.forEach((auction) => {
          if (auction.id === state.biddingOn.id) {
            bidAmount = auction.highestBid.amount + 1;
          }
        });
      }
      return { ...state, auctions, bidAmount };

    case GET_AUCTIONS_REQUEST:
    case CREATE_AUCTIONS_REQUEST:
    case PLACE_BID_REQUEST:
      return state;

    case PLACE_BID_RESPONSE:
    case CREATE_AUCTIONS_RESPONSE:
    case GET_AUCTIONS_ERROR:
    case CREATE_AUCTIONS_ERROR:
    case PLACE_BID_ERROR:
      return { ...errorReducer(state, action) };

    case SET_BIDDING_ON:
      return {
        ...state,
        biddingOn: payload,
        bidAmount: payload ? payload.highestBid.amount + 1 : 0,
      };

    case RESET_BIDDING_ON:
      return {
        ...state,
        biddingOn: null,
        bidAmount: 0,
      };

    case SET_BID_AMOUNT:
      return {
        ...state,
        bidAmount: payload,
      };
    case AUCTION_ERROR:
      return { ...state, error: false };
    default:
      return state;
  }
}
