import React from "react";
import { Button, Grid, Link } from "@mui/material";
import { Link as LinkRoute } from "react-router-dom";
import { IUser } from "../../types";
import { RootState } from "../../store";
import { connect } from "react-redux";

interface Props {
  currentUser?: IUser
}

const Home = ({ currentUser }: Props) => {
  return (
    <Grid container spacing={2} alignItems="center"
      justifyContent="center" style={{ minHeight: "70vh" }}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        Ola, {currentUser?.name}
      </Grid>
      <Grid item>
        <Button style={{ padding: 40 }} variant="contained" to="/game1/admin" component={LinkRoute}>Admin</Button>
      </Grid>
      <Grid item>
        <Button style={{ padding: 40 }} variant="contained" to="/game1/store" component={LinkRoute}>Loja</Button>
      </Grid>
      <Grid item>
        <Button style={{ padding: 40 }} variant="contained" to="/game1" component={LinkRoute}>
          Batalha
        </Button>
      </Grid>
      <Grid item>
        <Button style={{ padding: 40 }} variant="contained" to="/game1/Decks" component={LinkRoute}>Meus Deck</Button>
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Home)