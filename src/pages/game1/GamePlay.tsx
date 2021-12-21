import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Drawer, Grid, Typography } from "@mui/material";
import Board from "./components/board";
import CardHero from "./../../components/CardHero";
import { IDeckItem, IUser, IHero, IRoom } from "./../../types";
import api from "./../../api";
import { connect } from "react-redux";
import { RootState } from "../../store";

export interface IPlayer {
  id: string;
  nickName: string;
  photoURL: string;
  color: string;
}

const turns = [
  "Posicione seus heróis na arena",
  "Andar com o seu herói",
  "Batalhar",
  "Andar com o seu herói",
  "Finalizar",
];

const players: IPlayer[] = [
  {
    id: "yaB5gAe6UFNc3TaJwnWfnBigjKT2",
    color: "red",
    nickName: "Hotmail",
    photoURL: "https://graph.facebook.com/4623448704434966/picture",
  },
  {
    id: "nlw8y6cU4NhbTtrXSMvKokqNpz23",
    color: "blue",
    nickName: "Gamil",
    photoURL: "",
  },
];

interface Props {
  currentUser?: IUser;
}

function Game1Play({ currentUser }: Props) {
  const loc = useLocation();
  const [turn, setTurn] = useState({ playerId: players[0].id, fase: 0 });
  const [room, setRoom] = useState<IRoom>();
  const [heroes, setHeroes] = useState<IDeckItem[]>([]);
  const [heroSelected, setHeroSelected] = useState<IDeckItem>();
  const [showCards, setShowCards] = useState({ open: false });
  const [showPlayers, setShowPlayers] = useState({ open: false });

  const currentPlayer = players.find((x) => x.id === turn.playerId);
  const cardsOfCurrentUser = (heroes || []).filter(
    (x) => x.userId === currentUser?.id
  );
  const cardsOfCurrentPlayer = (heroes || []).filter(
    (x) => x.userId === turn.playerId
  );
  const cardsInDeck = (cardsOfCurrentUser || []).filter((x) => x.status === 0);
  const cardsInHand = (cardsOfCurrentUser || []).filter((x) => x.status === 1);
  const cardsInBoard = (cardsOfCurrentUser || []).filter((x) => x.status === 2);

  useEffect(() => {
    const roomId = loc.pathname.split("/")[2];
    api.getRoomById(roomId, setRoom);
  }, [loc.pathname]);

  const loadHeroes = () => {
    api.getHeros().then((response) => {
      const deck = response as IDeckItem[];
      const newDeck = deck.map((d) => {
        return {
          ...d,
          status: 0,
        };
      });

      setHeroes([
        ...players.map((p) => {
          const king: IDeckItem = {
            id: p.id,
            userId: p.id,
            tipo: "rei",
            status: 0,
            attack: 500,
            defense: 2000,
            enabled: true,
            name: p.nickName,
            x: -1,
            y: -1,
            parts: [
              {
                photosURL: [p.photoURL],
                width: 100,
                className:"animate__delay-2s animate__bounce animate__slow"
              },
            ],
          };
          return king;
        }),
        ...newDeck,
      ]);
    });
  };

  useEffect(() => {
    loadHeroes();
  }, []);

  useEffect(() => {
    if (
      heroSelected?.id &&
      heroSelected?.status === 2 &&
      heroSelected?.x &&
      heroSelected?.y
    ) {
      setHeroes(
        heroes.map((_a, idx) => {
          if (_a.id === heroSelected?.id) {
            return {
              ..._a,
              x: heroSelected?.x || -1,
              y: heroSelected?.y || -1,
              status: 2,
            };
          }
          return _a;
        })
      );
    }
  }, [heroSelected?.id, heroSelected?.x, heroSelected?.y]);

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
          {turns[turn.fase]}
        </Grid>
        <Grid item>
          <Board
            size={room?.size}
            players={players}
            cardsInBoard={cardsInBoard}
            onSelected={(x, y) => {
              const heroSelect = heroes.find(
                (_cell) => _cell.x === x && _cell.y === y
              );
              if (heroSelect) {
                setHeroSelected(heroSelect);
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
            // disabled={cardsInDeck.length === 0}
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
            onClick={() =>
              setTurn({
                ...turn,
                fase: turn.fase + 1,
              })
            }
          >
            {turns[turn.fase + 1]}
          </Button>
        </Grid>
      </Grid>

      <Drawer
        anchor="left"
        PaperProps={{
          style: { backgroundColor: "#FFF5" },
        }}
        open={showPlayers.open}
        onClose={() => setShowPlayers({ open: false })}
      >
        <Grid container spacing={1} justifyContent="center" direction="column">
          {players.map((p, idx) => {
            return (
              <Grid item>
                <Button
                  style={{
                    [p.id === currentPlayer?.id
                      ? "backgroundColor"
                      : "borderColor"]: p.color,
                    width: 300,
                  }}
                  variant={
                    p.id === currentPlayer?.id ? "contained" : "outlined"
                  }
                  onClick={() => setTurn({ fase: 0, playerId: p.id })}
                >
                  {p.nickName}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Drawer>

      <Drawer
        anchor="bottom"
        PaperProps={{
          style: { backgroundColor: "#FFF5" },
        }}
        open={showCards.open}
        onClose={() => setShowCards({ open: false })}
      >
        <Grid container spacing={2} justifyContent="center">
          {cardsInHand.map((p, idx) => {
            let border = "5px solid #CCCCCC";
            if (heroSelected?.id === p.id) {
              border = "5px solid blue";
            }
            return (
              <Grid item>
                <div style={{ border }}>
                  <CardHero
                    hero={p}
                    onClick={() => {
                      if (p.id === heroSelected?.id) {
                        debugger;
                        setHeroSelected(undefined);
                      } else {
                        setHeroSelected(p);
                      }
                    }}
                  />
                </div>
              </Grid>
            );
          })}

          <Grid item>
            <Button
              size="large"
              variant="outlined"
              style={{
                backgroundImage: cardsInDeck.length
                  ? "url(https://img.elo7.com.br/product/zoom/2A58C4E/papel-de-parede-carta-baralho-poquer-jogo-cartas-barbearia-papel-de-parede.jpg)"
                  : "",
                border: "1px solid #CCC",
                width: 241 / 3,
                height: 392 / 3,
              }}
              disabled={cardsInDeck.length === 0}
              onClick={() =>
                setHeroes(
                  heroes.map((_a) => {
                    if (_a.id === cardsInDeck[0].id) {
                      return { ..._a, status: 1 };
                    }
                    return _a;
                  })
                )
              }
            >
              DECK
              <br />
              {cardsInDeck.length} cartas
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Game1Play);
