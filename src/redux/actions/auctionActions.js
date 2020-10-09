import AuctionService from "../../services/auctionService";
import { setLoadingSpinner } from "./spinnerActions";
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
} from "./types";

import errorActionCreator from "./errorAction";

const getToken = (state) => state.auth.token;

export const getAuctions = () => async (dispatch, getState) => {
  dispatch({ type: GET_AUCTIONS_REQUEST, payload: null });
  try {
    const auctions = await new AuctionService(
      getToken(getState())
    ).fetchAuctions();

    dispatch({ type: GET_AUCTIONS_RESPONSE, payload: auctions });
    return true;
  } catch (err) {
    dispatch(errorActionCreator(GET_AUCTIONS_ERROR, err));
    return false;
  }
};

export const createAuction = (title, pictureBase64) => async (
  dispatch,
  getState
) => {
  let result = false;
  dispatch(setLoadingSpinner(true));
  dispatch({ type: CREATE_AUCTIONS_REQUEST, payload: null });
  try {
    await new AuctionService(getToken(getState())).createAuction(
      title,
      pictureBase64
    );
    dispatch({ type: CREATE_AUCTIONS_RESPONSE, payload: null });
    result = true;
  } catch (err) {
    dispatch(errorActionCreator(CREATE_AUCTIONS_ERROR, err));
  }
  dispatch(setLoadingSpinner(false));
  return result;
};

export const placeBid = () => async (dispatch, getState) => {
  let result = false;
  const prevState = getState();
  dispatch(setLoadingSpinner(true));
  dispatch({ type: PLACE_BID_REQUEST, payload: null });
  try {
    await new AuctionService(getToken(prevState)).placeBid(
      prevState.auction.biddingOn.id,
      prevState.auction.bidAmount
    );
    dispatch({ type: PLACE_BID_RESPONSE, payload: null });
    dispatch(getAuctions());
    dispatch(resetBiddingOn());
    result = true;
  } catch (err) {
    dispatch(errorActionCreator(PLACE_BID_ERROR, err));
  }
  dispatch(setLoadingSpinner(false));
  return result;
};

export const setBiddingOn = (auction) => {
  return {
    type: SET_BIDDING_ON,
    payload: auction,
  };
};

export const resetBiddingOn = () => {
  return {
    type: RESET_BIDDING_ON,
    payload: null,
  };
};

export const setBidAmount = (amount) => {
  return {
    type: SET_BID_AMOUNT,
    payload: amount,
  };
};
