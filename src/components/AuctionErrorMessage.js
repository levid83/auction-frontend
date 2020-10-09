import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUCTION_ERROR } from "../redux/actions/types";
import errorActionCreator from "../redux/actions/errorAction";
import { getAuctionError } from "../redux/selectors/getError";

import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";

const AuctionErrorMessage = (props) => {
  const error = useSelector(getAuctionError);
  const dispatch = useDispatch();

  if (!error) return null;

  const onClose = () => dispatch(errorActionCreator(AUCTION_ERROR, false));

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={true}
      autoHideDuration={5000}
      onClose={onClose}
      message={error.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: props.classes.root,
        },
      }}
    />
  );
};
const StyledAuctionErrorMessage = withStyles({
  root: {
    background:
      "linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)",
    color: "white",
  },
})(AuctionErrorMessage);

export default StyledAuctionErrorMessage;
