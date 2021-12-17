import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { IRoom, IUser } from "./../../types";
import { Link } from "react-router-dom";
import api from "../../api";
import AddOrEditRoomModal from "./components/addOrEditRoomModal";

interface Props {
  currentUser: IUser,
}

interface IModal {
  open: boolean
  data?: IRoom
}

const Game1Rooms = ({ currentUser }: Props) => {
  const [modal, setModal] = useState<IModal>({ open: false })
  const [rooms, setRooms] = useState<IRoom[]>([])

  const loadRooms = () => {
    const filter: IRoom = {}
    api.getRooms(filter).then(response => {
      setRooms(response)
    })
  }

  useEffect(() => {
    loadRooms()
  }, [])

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center"
        justifyContent="center" style={{ height: "100vh" }}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setModal({ open: true })}
          >Nova sala</Button>
        </Grid>

        {rooms.map(r => {
          return (
            <Grid item key={r.id}>
              <Link to={`/game1/${r.id}`}>Sala: {r.name} ({r.id})</Link>
            </Grid>
          )
        })}
      </Grid>

      {modal.open &&
        <AddOrEditRoomModal
          currentUser={currentUser}
          data={modal.data}
          onHide={(r) => {
            setModal({ open: false })
          }}
        />
      }
    </>
  )
}


export default Game1Rooms