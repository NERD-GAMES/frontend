import React, { useEffect, useState } from "react";
import {
  Avatar,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Zoom,
} from "@mui/material";
import Board from "./components/board";
import { IDeckItem, IUser, IRoom, IHero } from "../../types";
import api from "../../api";
import { connect } from "react-redux";
import { RootState } from "../../store";
import CardHero from "../../components/CardHero";
import { IPlayer } from "./GamePlay";



const getRamdomEffectExit = () => {
  const effects = [
    "animate__backOutDown",
    "animate__backOutLeft",
    "animate__backOutLeft",
    "animate__backOutUp",
    "animate__bounceOut",
    "animate__bounceOutDown",
    "animate__bounceOutDown",
    "animate__bounceOutRight",
    "animate__bounceOutUp",
    "animate__fadeOut",
    "animate__fadeOutDown",
    "animate__fadeOutDownBig",
    "animate__fadeOutLeft",
    "animate__fadeOutLeftBig",
    "animate__fadeOutRight",
    "animate__fadeOutRightBig",
    "animate__fadeOutUp",
    "animate__fadeOutUpBig",
    "animate__fadeOutTopLeft",
    "animate__fadeOutTopRight",
    "animate__fadeOutBottomRight",
    "animate__fadeOutBottomLeft",
    "animate__rotateOut",
    "animate__rotateOutDownLeft",
    "animate__rotateOutDownRight",
    "animate__rotateOutUpLeft",
    "animate__rotateOutUpRight",
    "animate__zoomOut",
    "animate__zoomOutDown",
    "animate__zoomOutLeft",
    "animate__zoomOutRight",
    "animate__zoomOutUp",
    "animate__slideOutDown",
    "animate__slideOutLeft",
    "animate__slideOutRight",
    "animate__slideOutUp",
  ]
  return effects[Math.floor(Math.random() * effects.length)]

}

interface Props {
  room: IRoom,
  updateHero: (hero: IHero) => void
}


function BattleModal({ room, updateHero }: Props) {
  const { battle, players } = room
  const def = battle?.heroDef || {}
  const atk = battle?.heroAtk || {}


  const player1 = players?.find(x => x.id === atk.userId)
  const player2 = players?.find(x => x.id === def.userId)
  useEffect(() => {
    def.defense = (def?.defense || 0) - (atk.attack || 0)

    setTimeout(() => {
      new Audio("/frontend/song/attack.wav").play()
    }, 300);

    setTimeout(() => {
      updateHero(def)
    }, 3500)
  }, [])

  return (
    <Dialog
      fullScreen
      open
    >
      <DialogContent
        style={{
          padding: 20,
          backgroundImage:
            "url(https://images.tcdn.com.br/img/img_prod/607564/mural_de_parede_montanhas_1554_2_20180126155300.jpg)",
        }}
      >

        <Grid container spacing={10} justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
          <Grid item>
            <Grid container spacing={10} justifyContent="center">
              <Grid item>
                <Avatar variant="square" src={player1?.photoURL} />
              </Grid>
              <Grid item>
                <Avatar variant="square" src={player2?.photoURL} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={10} justifyContent="center">
              <Grid item className={`animate__animated`}>
                <CardHero hero={battle?.heroAtk as IHero} />
              </Grid>
              <Grid item className={`animate__animated animate__delay-1s ${getRamdomEffectExit()}`}>
                <CardHero hero={battle?.heroDef as IHero} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>


      </DialogContent>
    </Dialog>
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(BattleModal);
