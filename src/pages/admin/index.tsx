import React, { useEffect, useState } from "react";
import { Container, Fab, Grid, Icon, IconButton } from "@mui/material";
import api from "../../api";
import CardHero from "../../components/CardHero";
import Menu from "../../components/Menu";
import Title from "../../components/Title";
import { IHero, IUser } from "../../types";
import AddOrEditHeroModal from "./addOrEditHeroModal";
import { Add as AddIcon } from "@mui/icons-material";

interface IModal {
  open: boolean
  data?: IHero
}

const Heroes = () => {
  const [modal, setModal] = useState<IModal>({ open: false })
  const [heroes, setHeroes] = useState<IHero[]>([])

  const loadHeroes = () => {
    api.getHeros().then(response => {
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
          <Fab size="small" variant="extended" onClick={() => setModal({ open: true })}>
            <AddIcon />
            adicionar
          </Fab>
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
        <Menu />
      </Container>


      {modal.open &&
        <AddOrEditHeroModal
          data={modal.data}
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