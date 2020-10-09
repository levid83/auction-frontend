import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { createAuction } from "../redux/actions/auctionActions";

import {
  Container,
  FormControl,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import PictureUpload from "../components/PictureUpload";

import AuctionErrorMessage from "../components/AuctionErrorMessage";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 400,
  },
  pictureUpload: {
    marginTop: 20,
    marginBottom: 20,
    alignContent: "center",
  },
}));

const CreateAuctionPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [base64, setBase64] = useState(null);
  const classes = useStyles();

  const submitAuction = async (title) => {
    dispatch(createAuction(title, base64)).then(
      (res) => res && history.push("/")
    );
  };

  return (
    <Container width={200} fixed>
      <h1>Create an Auction</h1>

      <form className={classes.form} noValidate autoComplete="off">
        <FormControl fullWidth>
          <TextField
            label="Auction Title"
            id="standard-adornment-amount"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The name of the auction item"
            type="string"
            variant="outlined"
          />
        </FormControl>
        <div className={classes.pictureUpload}>
          <PictureUpload onPictureSelected={(base64) => setBase64(base64)} />
        </div>
        <div>
          <Button
            onClick={() => submitAuction(title)}
            disabled={!title.length || !base64}
          >
            Create auction
          </Button>
        </div>
      </form>
      <AuctionErrorMessage />
    </Container>
  );
};

export default CreateAuctionPage;
