import { Button, Card, CardContent, CardMedia, Container, Grid, Icon, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import CardHero from "../../components/CardHero";
import Title from "../../components/Title";
import { IHero, IUser } from "../../types";
import AddOrEditHeroModal from "./addOrEditHeroModal";

interface Props {
  currentUser: IUser
}

const INITIAL_HERO: IHero = {
  name: ""
}

interface IModal {
  open: boolean
  data?: IHero
}

const Heroes = ({ currentUser }: Props) => {
  const [modal, setModal] = useState<IModal>({ open: false })
  const [heroes, setHeroes] = useState<IHero[]>([])

  const loadHeroes = () => {
    const filter: IHero = {}
    api.getHeros(filter).then(response => {
      setHeroes(response)
    })
  }

  useEffect(() => {
    loadHeroes()
  }, [])

  return (
    <>
      <Container>
        <Title title="Cadastro de Heróis" right={(
          <IconButton onClick={() => setModal({ open: true })}>
            <Icon>add</Icon>
          </IconButton>
        )} />

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {heroes.map(h => {
            return (
              <Grid item>
                <CardHero hero={h} onClick={() => setModal({ open: true, data: h })} />
              </Grid>
            )
          })}
        </Grid>
      </Container>


      {modal.open &&
        <AddOrEditHeroModal
          currentUser={currentUser}
          data={{ ...modal.data, userId: currentUser.id }}
          onHide={(r) => {
            setModal({ open: false })
            if (r === true) loadHeroes()
          }}
        />
      }
    </>
  )
}


export default Heroes