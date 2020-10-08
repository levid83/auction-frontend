import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBiddingOn,
  setBidAmount,
  placeBid,
} from "../redux/actions/auctionActions";

import {
  Modal,
  makeStyles,
  Fade,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    borderRadius: 10,
  },
}));

const BidModal = () => {
  const classes = useStyles();
  const auction = useSelector((state) => state.auction.biddingOn);
  const bidAmount = useSelector((state) => state.auction.bidAmount);
  const dispatch = useDispatch();

  if (!auction) {
    return null;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={!!auction}
      onClose={() => dispatch(setBiddingOn(null))}
      closeAfterTransition
    >
      <Fade in={!!auction}>
        <div className={classes.paper}>
          <h2>Bid on "{auction.title}"</h2>
          <form noValidate autoComplete="off">
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">
                Bid Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={bidAmount}
                onChange={(e) => dispatch(setBidAmount(e.target.value))}
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <br />
            <br />
            <div>
              <Button
                style={{ float: "right" }}
                onClick={() => dispatch(placeBid(auction.id, bidAmount))}
              >
                Place Bid
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default BidModal;
