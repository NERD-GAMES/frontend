import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IDeckItem, IRoom, IUser } from "./../../types";
import api from "../../api";
import AddOrEditRoomModal from "./components/addOrEditRoomModal";
import { connect } from "react-redux";
import { RootState } from "../../store";

interface IModal {
  open: boolean;
  data?: IRoom;
}

interface Props {
  currentUser?: IUser;
}

const Rooms = ({ currentUser }: Props) => {
  const nav = useNavigate();
  const [modal, setModal] = useState<IModal>({ open: false });
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const loadRooms = () => {
    const filter: IRoom = { status: "wait" };
    api.getRooms(filter).then((response) => {
      setRooms(response);
    });
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const loadHeroes = async () => {
    const heroes = await api.getHerosByUserId(`${currentUser?.id}`);

    const king: IDeckItem = {
      id: currentUser?.id,
      userId: currentUser?.id,
      tipo: "rei",
      status: 0,
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

    return [king, ...heroes];
  };

  const goRoom = async (id: string | undefined) => {
    const herosOfUser = (await loadHeroes()) as IDeckItem[];
    await api.addPlayerToRoom(
      `${id}`,
      herosOfUser.map((hr, idx) => {
        if (idx < 4) return { ...hr, status: 1 };
        return hr;
      }),
      {
        id: currentUser?.id,
        color: "red",
        nickName: `${currentUser?.name}`,
        photoURL: `${currentUser?.photoURL}`,
      }
    );
    nav(`${id}`);
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h2" color="firebrick">
            Batalha Naval Xadrez
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setModal({ open: true })}>
            Nova sala
          </Button>
        </Grid>

        {rooms.map((r) => {
          return (
            <Grid item key={r.id}>
              <Button onClick={() => goRoom(r.id)}>
                Sala: {r.name} ({r.id})
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {modal.open && (
        <AddOrEditRoomModal
          data={modal.data}
          onHide={(r) => {
            setModal({ open: false });
          }}
        />
      )}
    </Container>
  );
};

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Rooms);
