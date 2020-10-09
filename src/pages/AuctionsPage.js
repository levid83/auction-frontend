import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { getAuctions, setBiddingOn } from "../redux/actions/auctionActions";

import AuctionErrorMessage from "../components/AuctionErrorMessage";

import Auction from "../components/Auction";
import BidModal from "../components/BidModal";

import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const containerWidth = 1000;
const cardPadding = 14;
const cardWidth = containerWidth / 2 - cardPadding * 2;

const useStyles = makeStyles({
  auctionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: containerWidth,
    margin: "auto",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
    },
  },
  auctionCard: {
    flexBasis: "auto",
    maxWidth: cardWidth,
    minWidth: "330px",
    padding: cardPadding,
  },
  fabContainer: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  createAuctionButton: {
    background:
      "linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)",
  },
});

const AuctionsPage = () => {
  const auctions = useSelector((state) => state.auction.auctions);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAuctions());
    setInterval(() => {
      if (
        history.location.pathname === "/auctions" ||
        history.location.pathname === "/"
      ) {
        dispatch(getAuctions());
      }
    }, process.env.REACT_APP_REFRESH_RATE);
  }, [dispatch, history, token]);

  const renderAuctions = () => {
    if (auctions != null && !auctions.length) {
      return (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h4>No auctions available. Create one?</h4>
        </div>
      );
    }

    return (
      auctions != null &&
      auctions.map((auction) => {
        let bidState = "CAN_BID";
        if (auction.seller === email) {
          bidState = "OWN_AUCTION";
        }

        if (auction.highestBid.bidder === email) {
          bidState = "HIGHEST_BIDDER";
        }

        return (
          <div key={auction.id} className={classes.auctionCard}>
            <Auction
              auction={auction}
              bidState={bidState}
              onBid={() => dispatch(setBiddingOn(auction))}
            />
          </div>
        );
      })
    );
  };

  return (
    <div className={classes.auctionsContainer}>
      <BidModal />

      {renderAuctions()}

      <div className={classes.fabContainer}>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.createAuctionButton}
          onClick={() => history.push("/create")}
        >
          <AddIcon />
        </Fab>
      </div>
      <AuctionErrorMessage />
    </div>
  );
};

export default React.memo(AuctionsPage);
