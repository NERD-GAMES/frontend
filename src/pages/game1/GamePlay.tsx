import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Board from "./components/board";
import { IDeckItem, IUser, IRoom } from "./../../types";
import api from "./../../api";
import { connect } from "react-redux";
import { RootState } from "../../store";
import PlayersDrawer from "./components/playersDrawer";
import HandDrawer from "./components/handDrawer";

export interface IPlayer {
  id?: string;
  nickName?: string;
  photoURL?: string;
  color?: string;
}

const turns = [
  "Posicione seus heróis na arena",
  "Andar com o seu herói",
  "Batalhar",
  "Andar com o seu herói",
  "Finalizar",
];

interface Props {
  currentUser?: IUser;
}

function Game1Play({ currentUser }: Props) {
  const loc = useLocation();
  const [room, setRoom] = useState<IRoom>();
  const players = room?.players || [];
  const heroes = room?.heroes || [];
  const turn = room?.turn || "";
  const [heroSelected, setHeroSelected] = useState<IDeckItem>();
  const [showCards, setShowCards] = useState({ open: false });
  const [showPlayers, setShowPlayers] = useState({ open: false });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentPlayer = players.find(
    (x) => x.id === room?.currentPlayerId || ""
  );
  const cardsOfCurrentUser = (heroes || []).filter(
    (x) => x.userId === currentUser?.id
  );
  const cardsInDeck = (cardsOfCurrentUser || []).filter((x) => !x.status);
  const cardsInHand = (cardsOfCurrentUser || []).filter((x) => x.status === 1);
  const cardsInBoard = (heroes || []).filter((x) => x.status === 2);

  useEffect(() => {
    const roomId = loc.pathname.split("/")[2];
    const unsubscribe = api.getRoomById(roomId).onSnapshot((doc: any) => {
      setRoom({ ...doc.data(), id: doc.id });
    });

    return () => unsubscribe();
  }, [loc.pathname]);

  useEffect(() => {
    if (
      heroSelected?.id &&
      heroSelected?.status === 2 &&
      heroSelected?.x &&
      heroSelected?.y
    ) {
      api.addOrUpdateRoom({
        id: room?.id,
        heroes: heroes.map((_a, idx) => {
          if (_a.id === heroSelected?.id) {
            return {
              ..._a,
              x: heroSelected?.x || -1,
              y: heroSelected?.y || -1,
              status: 2,
            };
          }
          return _a;
        }),
      });
    }
  }, [heroSelected?.id, heroSelected?.x, heroSelected?.y]);

  const setRoomDB = (r: IRoom) => {
    if (room?.id) {
      api.addOrUpdateRoom({ id: room.id, ...r });
    }
  };

  if (!room || !room.status || room?.status === "wait") {
    return (
      <Container>
        <Grid container>
          <Grid item>
            <Typography variant="h3">Jogadores</Typography>

            <List>
              {players.map((p) => {
                return (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar src={p.photoURL} />
                      </ListItemIcon>
                      <ListItemText primary={p.nickName} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          {players.length > 1 && (
            <Button onClick={() => setRoomDB({ status: "in-prograss" })}>
              Iniciar
            </Button>
          )}
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: 20 }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          {turns[turn || 0]}
        </Grid>
        <Grid item>
          <Board
            size={room?.size}
            players={players}
            cardsInBoard={cardsInBoard}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            onSelected={(x, y, e) => {
              const heroSelect = heroes.find(
                (_cell) => _cell.x === x && _cell.y === y
              );
              if (heroSelect) {
                setHeroSelected(heroSelect);
                setAnchorEl(e.currentTarget);
              } else if (heroSelected?.id) {
                setHeroSelected({ ...heroSelected, x, y, status: 2 });
              }
            }}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="outlined"
            style={{
              backgroundImage:
                "url(https://img.elo7.com.br/product/zoom/2A58C4E/papel-de-parede-carta-baralho-poquer-jogo-cartas-barbearia-papel-de-parede.jpg)",
              border: "1px solid #CCC",
              width: 241 / 3,
              height: 392 / 3,
            }}
            onClick={() => setShowCards({ open: true })}
          >
            Minha mão
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="outlined"
            // disabled={cardsInDeck.length === 0}
            style={{
              border: "1px solid #CCC",
              width: 241 / 3,
              height: 392 / 3,
            }}
            onClick={() => setShowPlayers({ open: true })}
          >
            Players
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="outlined"
            // disabled={cardsInDeck.length === 0}
            style={{
              border: "1px solid #CCC",
              width: 241 / 3,
              height: 392 / 3,
            }}
            onClick={() => setRoomDB({ turn: (turn || 0) + 1 })}
          >
            {turns[(turn || 0) + 1]}
          </Button>
        </Grid>
      </Grid>

      <PlayersDrawer
        currentPlayer={currentPlayer}
        players={players}
        setShowPlayers={setShowPlayers}
        setTurn={() => setRoomDB({ turn: (turn || 0) + 1 })}
        showPlayers={showPlayers}
      />

      <HandDrawer
        showCards={showCards}
        setShowCards={setShowCards}
        cardsInHand={cardsInHand}
        heroSelected={heroSelected}
        setHeroSelected={setHeroSelected}
        cardsInDeck={cardsInDeck}
        setHeroes={(hrs: any) =>
          api.addOrUpdateRoom({
            id: room?.id,
            heroes: hrs,
          })
        }
        heroes={heroes}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Andar</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Atacar</MenuItem>
      </Menu>
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Game1Play);
