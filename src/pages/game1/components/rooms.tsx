import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { IUser } from "../../../App";

interface Props {
  currentUser: IUser,
  setRoom: React.Dispatch<React.SetStateAction<number>>
}

const Home = ({ currentUser, setRoom }: Props) => {
  return (
    <Grid container spacing={2} direction="column" alignItems="center"
      justifyContent="center" style={{ height: "100vh" }}>
      <Grid item>
        Game 1
      </Grid>
      <Grid item>
        Ola, {currentUser.name}
      </Grid>
      <Grid item>

        <Button variant="contained">Nova sala</Button>


      </Grid>
      {[1, 2, 3, 4, 5].map(r => {
        return (
          <Grid item key={r}>
            <Button onClick={() => setRoom(r)}>Sala {r}</Button>
          </Grid>
        )
      })}
    </Grid>
  )
}


export default Home