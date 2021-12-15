import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../App";

interface Props {
  currentUser: IUser
}

const Home = ({ currentUser }: Props) => {
  return (
    <Grid container spacing={2} direction="column" alignItems="center"
      justifyContent="center" style={{height:"100vh"}}>
      <Grid item>
        Ola, {currentUser.name}
      </Grid>
      <Grid item>
        <Link to="/game1">Game 1</Link>
      </Grid>
      <Grid item>
        <Link to="/">Game 2</Link>
      </Grid>
    </Grid>
  )
}


export default Home