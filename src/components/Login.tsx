import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import Api from '../api';
import { IUser } from '../types';


interface Props {
  setUser: Dispatch<SetStateAction<IUser | undefined>>
}

function Login({ setUser }: Props) {

  const handleFacebookLogin = async () => {
    const user = await Api.loginWithFacebookPopup(setUser)
    if (user) {
      await Api.addUser(user)
    }
  }

  const handleGoogleLogin = async () => {
    const user = await Api.loginWithGooglePopup(setUser)
    if (user) {
      await Api.addUser(user)
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

export default Login;
