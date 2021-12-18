import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import Board from './components/board';
import CardHero from './../../components/CardHero';
import { IDeckItem, IUser, IHero, IRoom } from './../../types';
import api from './../../api';
import { connect } from 'react-redux';
import { RootState } from '../../store';

export interface IPlayer {
  id: string
  nickName: string
  color: string
}

const turns = [
  "Posicionar cartas",
  "Andar",
  "Batalha",
  "Andar",
  "Finalizar"
]

const players: IPlayer[] = [
  { id: "yaB5gAe6UFNc3TaJwnWfnBigjKT2", color: "red", nickName: "Everton" },
  { id: "nlw8y6cU4NhbTtrXSMvKokqNpz23", color: "blue", nickName: "Ana" },
]

interface Props {
  currentUser?: IUser
}

function Game1Play({ currentUser }: Props) {
  const loc = useLocation()
  const [turn, setTurn] = useState({ playerId: players[0].id, fase: 0 })
  const [room, setRoom] = useState<IRoom>()
  const [heroes, setHeroes] = useState<IDeckItem[]>([])
  const [heroSelected, setHeroSelected] = useState<IDeckItem>()

  const currentPlayer = players.find(x => x.id === turn.playerId)
  const cardsOfCurrentUser = (heroes || []).filter(x => x.userId === currentUser?.id)
  const cardsOfCurrentPlayer = (heroes || []).filter(x => x.userId === turn.playerId)
  const cardsInDeck = (cardsOfCurrentUser || []).filter(x => x.status === 0)
  const cardsInHand = (cardsOfCurrentUser || []).filter(x => x.status === 1)
  const cardsInBoard = (cardsOfCurrentUser || []).filter(x => x.status === 2)

  useEffect(() => {
    const roomId = loc.pathname.split("/")[2]
    api.getRoomById(roomId, setRoom)
  }, [loc.pathname])

  const loadHeroes = () => {
    api.getHeros().then((response) => {
      const deck = response as IDeckItem[]
      const newDeck = deck.map(d => {
        return {
          ...d,
          status: 0
        }
      })
      setHeroes(newDeck)
    })
  }

  useEffect(() => {
    loadHeroes()
  }, [])

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item >
          <Board
            size={room?.size}
            players={players}
            cardsInBoard={cardsInBoard}
            onSelected={(x, y) => {
              setHeroes(heroes.map((_a, idx) => {
                if (_a.id === heroSelected?.id) {
                  return { ..._a, x, y, status: 2 }
                }
                return _a
              }))
              setHeroSelected(undefined)
            }}
          />
        </Grid>
        <Grid item>

          <Grid container spacing={1} justifyContent="center" direction="column">
            {players.map((p, idx) => {
              return (
                <Grid item>
                  <Button
                    style={{ [p.id === currentPlayer?.id ? "backgroundColor" : "borderColor"]: p.color, width: 300 }}
                    variant={p.id === currentPlayer?.id ? "contained" : "outlined"}
                    onClick={() => setTurn({ fase: 0, playerId: p.id })}>
                    {p.nickName}
                  </Button>
                </Grid>
              )
            })}
            <Grid item>
              <Button
                style={{ width: 300, padding: 50, marginTop: 50 }}
                size="large"
                variant="outlined" onClick={() => setTurn({
                  ...turn,
                  fase: turn.fase + 1
                })}>{turns[turn.fase + 1]}
              </Button>
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h3">
            É a vez de {players.find(p => p?.id === currentPlayer?.id)?.nickName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            {cardsInHand.map((p, idx) => {
              let border = "5px solid #CCCCCC"
              if (heroSelected?.id === p.id) {
                border = "5px solid blue"
              }

              return (
                <Grid item sx={{ marginTop: (heroSelected == null || heroSelected?.id === p.id) ? 0 : 10 }}>
                  <div style={{ border }}>
                    <CardHero hero={p} onClick={() => setHeroSelected(p)} />
                  </div>
                </Grid>
              )
            })}
            {cardsInDeck.length > 0 &&
              <Grid item>
                <Button
                  size="large"
                  variant="outlined"
                  style={{
                    backgroundImage: "url(https://img.elo7.com.br/product/zoom/2A58C4E/papel-de-parede-carta-baralho-poquer-jogo-cartas-barbearia-papel-de-parede.jpg)",
                    border: "1px solid #CCC",
                    width: 300,
                    height: 415
                  }}
                  disabled={cardsInDeck.length === 0}
                  onClick={() => setHeroes(heroes.map(_a => {
                    if (_a.id === cardsInDeck[0].id) {
                      return { ..._a, status: 1 }
                    }
                    return _a
                  }))}>
                  DECK
                  <br />
                  {cardsInDeck.length} cartas
                </Button>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid >
    </>
  );
}


function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Game1Play)
