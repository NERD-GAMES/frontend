import React, { Dispatch, SetStateAction } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid } from '@mui/material';

import Api from '../api';
import { IUser } from '../types';
import { Creators as userActions } from "./../store/ducks/currentUser";
import { RootState } from '../store';


interface Props {
  setLoginAction: any
}

function Login({ setLoginAction }: Props) {

  const handleFacebookLogin = async () => {
    const user = await Api.loginWithFacebookPopup()
    if (user) {
      await Api.addUser(user)
      Api.getUserById(user.email, setLoginAction)
    }
  }

  const handleGoogleLogin = async () => {
    const user = await Api.loginWithGooglePopup()
    if (user) {
      await Api.addUser(user)
      Api.getUserById(user.email, setLoginAction)
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item>
        <Button
          style={{ width: 300 }}
          variant="outlined"
          onClick={handleFacebookLogin} >
          Entrar Com Facebook
        </Button>
      </Grid>
      <Grid item>
        <Button
          style={{ width: 300 }}
          variant="outlined"
          onClick={handleGoogleLogin} >
          Entrar Com Google
        </Button>
      </Grid>
    </Grid >
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setLoginAction: userActions.setLoginAction
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
