import {
  GET_AUCTIONS,
  PLACE_BID,
  SET_BIDDING_ON,
  RESET_BIDDING_ON,
  CREATE_AUCTION,
  SET_BID_AMOUNT,
} from "../actions/types";
const initialState = {
  auctions: null,
  biddingOn: null,
  bidAmount: 0,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AUCTIONS:
      const auctions = action.payload;
      let bidAmount = state.bidAmount;
      if (state.biddingOn) {
        auctions.forEach((auction) => {
          if (auction.id === state.biddingOn.id) {
            bidAmount = auction.highestBid.amount + 1;
          }
        });
      }
      return { ...state, auctions, bidAmount };
    case CREATE_AUCTION:
      return { ...state };

    case SET_BIDDING_ON:
      return {
        ...state,
        biddingOn: action.payload,
        bidAmount: action.payload ? action.payload.highestBid.amount + 1 : 0,
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
        bidAmount: action.payload,
      };
    case PLACE_BID:
      return { ...state };
    default:
      return state;
  }
}
