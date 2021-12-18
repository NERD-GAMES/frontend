import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from "@mui/material";
import api from "./../../../api";
import Title from "../../../components/Title";
import { IRoom, IUser } from "../../../types";
import { connect } from "react-redux";
import { RootState } from "../../../store";

interface Props {
  onHide: (refresh?: boolean) => void
  data?: IRoom
}

const INITIAL_HERO: IRoom = {
  name: "",
  size: "md"
}

const AddOrEditHeroModal = ({ onHide, data }: Props) => {
  const nav = useNavigate()
  const [room, setRoom] = useState({ ...INITIAL_HERO, ...data })

  const onSave = async () => {
    const newRoom = await api.addOrUpdateRoom(room) as IRoom
    nav("/game1/" + newRoom.id)
    onHide(true)
  }

  return (
    <Dialog open maxWidth="lg" fullWidth onClose={() => onHide()}>
      <DialogTitle>
        <Title title="Gerar uma sala nova" />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Nome da Sala"
              variant="filled"
              value={room?.name}
              onChange={(e) => setRoom({ ...room, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Tamanho"
              variant="filled"
              value={room.size || ""}
              onChange={(e) => setRoom({ ...room, size: e.target.value })}
              select
            >
              <MenuItem value="xs">Super Pequeno</MenuItem>
              <MenuItem value="sm">Pequeno</MenuItem>
              <MenuItem value="md">Médio</MenuItem>
              <MenuItem value="lg">Grande</MenuItem>
              <MenuItem value="xg">Super Grande</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddOrEditHeroModal