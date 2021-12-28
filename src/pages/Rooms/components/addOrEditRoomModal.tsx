import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import api from "../../../api";
import Title from "../../../components/Title";
import { IDeckItem, IRoom, IUser } from "../../../types";
import { connect } from "react-redux";
import { RootState } from "../../../store";

interface Props {
  onHide: (refresh?: boolean) => void;
  data?: IRoom;
  currentUser?: IUser;
}

const INITIAL_ROOM: IRoom = {
  name: "",
  status: "wait",
  size: "md",
};

const AddOrEditHeroModal = ({ onHide, data, currentUser }: Props) => {
  const nav = useNavigate();
  const [room, setRoom] = useState({ ...INITIAL_ROOM, ...data });

  const loadHeroes = async () => {
    const heroes = await api.getHerosByUserId(`${currentUser?.id}`);

    const king: IDeckItem = {
      id: currentUser?.id,
      userId: currentUser?.id,
      tipo: "rei",
      status: 1,
      attack: 500,
      defense: 2000,
      enabled: true,
      name: `${currentUser?.name}`,
      x: -1,
      y: -1,
      parts: [
        {
          photosURL: [`${currentUser?.photoURL}`],
          width: 100,
          className: "animate__delay-2s animate__bounce animate__slow",
        },
      ],
    };

    return [king, ...heroes] as IDeckItem[];
  };

  const onSave = async () => {
    const heroes = await loadHeroes();
    const player = {
      id: currentUser?.id,
      color: "red",
      nickName: `${currentUser?.name}`,
      photoURL: `${currentUser?.photoURL}`,
    };
    const newRoom = (await api.addOrUpdateRoom({
      ...room,
      currentPlayerId: player.id,
      turn: 0,
      heroes: heroes.map((hr, idx) => {
        if (idx < 4) return { ...hr, status: 1 };
        return hr;
      }),
      players: [player],
    })) as IRoom;
    nav("/" + newRoom.id);
    onHide(true);
  };

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
  );
};

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(AddOrEditHeroModal);
