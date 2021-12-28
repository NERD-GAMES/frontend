import React, { useEffect, useState } from "react";
import { Card, CardActionArea, Container, Fab, Grid, Icon, IconButton, Paper } from "@mui/material";
import api from "../../api";
import CardHero from "../../components/CardHero";
import Title from "../../components/Title";
import { IHero, IUser } from "../../types";
import BuyHeroModal from "./buyHeroModal";
import PaidIcon from '@mui/icons-material/Paid';
import Menu from "../../components/Menu";

interface IModal {
  open: boolean
  data?: IHero
}

const Heroes = () => {
  const [modal, setModal] = useState<IModal>({ open: false })
  const [heroes, setHeroes] = useState<IHero[]>([])

  const loadHeroes = () => {
    api.getHerosToBuy().then(response => {
      setHeroes(response)
    })
  }

  useEffect(() => {
    loadHeroes()
  }, [])

  return (
    <>
      <Container>
        <Title title="Loja de Heróis" />

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {heroes.map(h => {
            return (
              <Grid item>
                <Card style={{ padding: 8 }}>
                  <CardActionArea onClick={() => setModal({ open: true, data: h })}>
                    <CardHero hero={h} />
                    <div style={{ padding: 8, textAlign: "center" }}>
                      <Fab variant="extended" size="small" style={{ marginRight: 8 }} >
                        <PaidIcon style={{ marginRight: 8 }} />
                        {h.price || "Free"}
                      </Fab>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        <Menu />
      </Container>


      {modal.open &&
        <BuyHeroModal
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