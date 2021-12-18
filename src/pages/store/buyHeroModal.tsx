import React, { useState } from "react";
import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon, PhotoCamera } from "@mui/icons-material";
import api from "../../api";
import CardHero from "../../components/CardHero";
import Title from "../../components/Title";
import { IHero, IHeroPart, IUser } from "../../types";
import { cloneDeep } from 'lodash';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PaidIcon from '@mui/icons-material/Paid';
import { RootState } from "../../store";
import { connect } from "react-redux";

interface Props {
  currentUser?: IUser
  onHide: (refresh?: boolean) => void
  data?: IHero
}

const BuyHeroModal = ({ onHide, data, currentUser }: Props) => {
  const [hero, setHero] = useState(cloneDeep({ ...data, userId: currentUser?.id }))

  const onBuy = async () => {
    await api.addOrUpdateHero(hero)
    onHide(true)
  }

  return (
    <Dialog open maxWidth="lg" fullWidth onClose={() => onHide()}>
      <DialogTitle>
        <Title title="Confirmação de compra" />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardHero hero={hero} />
          </Grid>
          <Grid item xs>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  Você esta adiquirindo o herói {data?.name}
                </Typography>
                <Typography variant="h5">
                  Você pode renomea-lo se quiser.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: 350 }}
                  label="Nome do Herói"
                  variant="filled"
                  value={hero?.name}
                  onChange={(e) => setHero({ ...hero, name: e.target.value })}
                />
              </Grid>
              <Grid item>
                <Fab variant="extended" size="small" style={{ marginRight: 8 }} >
                  <PaidIcon style={{ marginRight: 8 }} />
                  {hero.price || "Free"}
                </Fab>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={onBuy}>
                  Comprar Agora
                </Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </DialogContent>
    </Dialog>
  )
}


function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BuyHeroModal)