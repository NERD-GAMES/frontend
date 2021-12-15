import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { IUser } from '../App';
import Api from '../api';


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
    </Grid >
  );
}

export default Login;
