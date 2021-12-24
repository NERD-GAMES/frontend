import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import api from "./api";
import Login from "./components/Login";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Router from "./pages/router";
import { RootState } from "./store";
import { IUser } from "./types";
import { Creators as userActions } from "./store/ducks/currentUser";

interface Props {
  currentUser?: IUser;
}
function App({ currentUser }: Props) {
  const [firebaseCurrentUser, setFirebaseCurrentUser] = useState({
    loading: true,
    uid: "",
  });

  useEffect(() => {
    api.onAuthStateChanged((user: any) => {
      setFirebaseCurrentUser({...user, loading: false});
    });
    return () => {};
  }, []);

  if (firebaseCurrentUser.loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (!currentUser?.id || currentUser?.id !== firebaseCurrentUser.uid) {
    return <Login />;
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Router />
    </div>
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
      setLogoffAction: userActions.setLogoffAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
