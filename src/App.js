import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { setToken } from "./redux/actions/authActions";

import NavBar from "./components/NavBar";

import ProtectedRoute from "./components/ProtectedRoute";
import AuctionsPage from "./pages/AuctionsPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import LoadingSpinner from "./components/LoadingSpinner";

const App = ({ auth0 }) => {
  const dispatch = useDispatch();
  const displaySpinner = useSelector((state) => state.spinner.displaySpinner);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    (async () => {
      const idToken = await auth0.getIdTokenClaims();
      if (idToken && idToken.__raw) {
        dispatch(setToken(idToken.__raw));
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0]);

  return (
    <div className="App">
      <LoadingSpinner display={displaySpinner} />
      <>
        <header>
          <NavBar />
        </header>
        {token && (
          <Switch>
            <ProtectedRoute path="/" exact component={AuctionsPage} />
            <ProtectedRoute path="/auctions" component={AuctionsPage} />
            <ProtectedRoute path="/create" component={CreateAuctionPage} />
          </Switch>
        )}
      </>
    </div>
  );
};

export default withAuth0(App);
