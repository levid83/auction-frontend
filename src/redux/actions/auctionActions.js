import AuctionService from "../../services/auctionService";
import { setLoadingSpinner } from "./spinnerActions";
import {
  GET_AUCTIONS,
  PLACE_BID,
  SET_BIDDING_ON,
  RESET_BIDDING_ON,
  CREATE_AUCTION,
  SET_BID_AMOUNT,
} from "./types";

export const getAuctions = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const auctions = await new AuctionService(state.auth.token).fetchAuctions();
    dispatch({ type: GET_AUCTIONS, payload: auctions });
  } catch (err) {
    dispatch({ type: GET_AUCTIONS, payload: [] });
  }
};

export const createAuction = (title, pictureBase64) => async (
  dispatch,
  getState
) => {
  dispatch(setLoadingSpinner(true));
  try {
    const state = getState();
    await new AuctionService(state.auth.token).createAuction(
      title,
      pictureBase64
    );
  } catch (err) {}
  dispatch({ type: CREATE_AUCTION, payload: null });
  dispatch(setLoadingSpinner(false));
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

export const placeBid = () => async (dispatch, getState) => {
  const prevState = getState();
  dispatch(setLoadingSpinner(true));
  const state = getState();
  await new AuctionService(state.auth.token).placeBid(
    prevState.auction.biddingOn.id,
    prevState.auction.bidAmount
  );
  dispatch({ type: PLACE_BID, payload: null });
  dispatch(getAuctions());
  dispatch(resetBiddingOn());
  dispatch(setLoadingSpinner(false));
};
