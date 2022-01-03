import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Grid } from "@mui/material";

import Api from "../api";
import { Creators as userActions } from "./../store/ducks/currentUser";
import { RootState } from "../store";
import { useBlockchain } from "./../blockchain";

interface Props {
  setLoginAction: any;
  setLogoffAction: any;
}

function Login({ setLoginAction, setLogoffAction }: Props) {
  const {
    isLoged,
    account,
    balance,
    myTokens,
    getMyTokensFromBlockchain,
    doLogin,
    doMint,
  }: any = useBlockchain()

  useEffect(() => {
    setLogoffAction();
    return () => { };
  }, []);

  const handleFacebookLogin = async () => {
    const user = await Api.loginWithFacebookPopup();
    if (user) {
      await Api.addUser(user);
      Api.getUserById(user.email, setLoginAction);
    }
  };

  const handleGoogleLogin = async () => {
    const user = await Api.loginWithGooglePopup();
    if (user) {
      await Api.addUser(user);
      Api.getUserById(user.email, setLoginAction);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Button
          style={{ width: 300 }}
          variant="outlined"
          onClick={handleFacebookLogin}
        >
          Entrar Com Facebook
        </Button>
      </Grid>
      <Grid item>
        <Button
          style={{ width: 300 }}
          variant="outlined"
          onClick={handleGoogleLogin}
        >
          Entrar Com Google
        </Button>
      </Grid>
      <Grid item>
        {!isLoged ?
          <Button
            style={{ width: 300 }}
            variant="outlined"
            onClick={doLogin}
          >
            Entrar Na Blockchain
          </Button>
          :
          <div>Você ja esta logado na blockchain</div>
        }
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setLoginAction: userActions.setLoginAction,
      setLogoffAction: userActions.setLogoffAction
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
