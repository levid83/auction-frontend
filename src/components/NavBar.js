import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

import { setClaims } from "../redux/actions/authActions";

import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    background:
      "linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)",
    padding: 14,
    marginBottom: 24,
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
  },
  header: {
    flexBasis: "50%",
    display: "flex",
  },
  loginLogoutContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexBasis: "50%",
  },
  button: {
    color: "white",
  },
});

const NavBar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();

  const classes = useStyles();
  useEffect(() => {
    if (user) dispatch(setClaims(user));
  }, [dispatch, user]);
  return (
    <div className={classes.navbar}>
      <div className={classes.header}>
        <h1 style={{ fontSize: 14, color: "white" }}>THE AUCTION HOUSE</h1>
      </div>
      <div className={classes.loginLogoutContainer}>
        {!isAuthenticated && (
          <Button
            className={classes.button}
            onClick={() => loginWithRedirect({})}
          >
            Sign in
          </Button>
        )}

        {isAuthenticated && (
          <Button className={classes.button} onClick={() => logout({})}>
            Sign out
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
