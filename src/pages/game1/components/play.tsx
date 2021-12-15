import React, { useState } from 'react';
import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Grid, Icon, IconButton, Rating, Table, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { IBoard, IDeck, IUser } from '../../../App';
import Board from './board';

export interface IPlayer {
  id: string
  nickName: string
  color: string
}

const turns = [
  "Posicionar cartas", "Andar", "Batalha", "Andar", "Finalizar"
]

const players: IPlayer[] = [
  { id: "yaB5gAe6UFNc3TaJwnWfnBigjKT2", color: "red", nickName: "Everton" },
  { id: "2", color: "blue", nickName: "Ana" },
  { id: "3", color: "pink", nickName: "Anderson" },
  { id: "4", color: "green", nickName: "Aldrei" },
  { id: "5", color: "yellow", nickName: "Bruno" },
  { id: "6", color: "gray", nickName: "Ricardo" },
]


const _allHeroes: IDeck[] = [
  {
    id: 1,
    avatar: "https://s3.us-east-1.amazonaws.com/mercadomistico.smserver.com.br/incensario-cabeca-de-dragao-preto_b6fc.jpeg", name: "Dragão preto",
    attack: 1500,
    defense: 600,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "yaB5gAe6UFNc3TaJwnWfnBigjKT2"
  },
  {
    id: 2, avatar: "https://db4sgowjqfwig.cloudfront.net/campaigns/160042/assets/804658/Monster_Manual_5e_-_Dragon__Green_-_p93.jpg?1512106869", name: "Dragão verde",
    attack: 1200,
    defense: 600,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "yaB5gAe6UFNc3TaJwnWfnBigjKT2"
  },
  {
    id: 3,
    avatar: "https://www.publicdomainpictures.net/pictures/290000/velka/yellow-dragon-head.jpg", name: "Dragão amarelo",
    attack: 1600,
    defense: 200,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "yaB5gAe6UFNc3TaJwnWfnBigjKT2"
  },
  {
    id: 4,
    avatar: "https://superlegalbrinquedos.vteximg.com.br/arquivos/ids/172233-800-800/1112_Figura_com_Movimento_e_Som_Dragao_Vermelho_Sopro_de_Fogo_Robo_Alive_Candide_2.jpg?v=637133337061170000", name: "Dragão vermelho",
    attack: 1700,
    defense: 300,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "yaB5gAe6UFNc3TaJwnWfnBigjKT2"
  },
  {
    id: 5,
    avatar: "https://superlegalbrinquedos.vteximg.com.br/arquivos/ids/172233-800-800/1112_Figura_com_Movimento_e_Som_Dragao_Vermelho_Sopro_de_Fogo_Robo_Alive_Candide_2.jpg?v=637133337061170000", name: "Dragão vermelho",
    attack: 1700,
    defense: 300,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "2"
  },
  {
    id: 6,
    avatar: "https://superlegalbrinquedos.vteximg.com.br/arquivos/ids/172233-800-800/1112_Figura_com_Movimento_e_Som_Dragao_Vermelho_Sopro_de_Fogo_Robo_Alive_Candide_2.jpg?v=637133337061170000", name: "Dragão vermelho",
    attack: 1700,
    defense: 300,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "2"
  },
  {
    id: 7,
    avatar: "https://superlegalbrinquedos.vteximg.com.br/arquivos/ids/172233-800-800/1112_Figura_com_Movimento_e_Som_Dragao_Vermelho_Sopro_de_Fogo_Robo_Alive_Candide_2.jpg?v=637133337061170000", name: "Dragão vermelho",
    attack: 1700,
    defense: 300,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "3"
  },
  {
    id: 8,
    avatar: "https://superlegalbrinquedos.vteximg.com.br/arquivos/ids/172233-800-800/1112_Figura_com_Movimento_e_Som_Dragao_Vermelho_Sopro_de_Fogo_Robo_Alive_Candide_2.jpg?v=637133337061170000", name: "Dragão vermelho",
    attack: 1700,
    defense: 300,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "3"
  },
  {
    id: 9,
    avatar: "https://superlegalbrinquedos.vteximg.com.br/arquivos/ids/172233-800-800/1112_Figura_com_Movimento_e_Som_Dragao_Vermelho_Sopro_de_Fogo_Robo_Alive_Candide_2.jpg?v=637133337061170000", name: "Dragão vermelho",
    attack: 1700,
    defense: 300,
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    status: 0,
    x: -1,
    y: -1,
    playerId: "4"
  }
].map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

const mockY = Math.floor(Math.random() * (20 - 10)) + 10
const mockX = Math.floor(Math.random() * (20 - 10)) + 10

const board: IBoard = { x: mockX, y: mockY }

interface Props {
  currentUser: IUser
  room: number
}

function Game1Play({ currentUser }: Props) {
  const [turn, setTurn] = useState({ playerId: players[0].id, fase: 0 })
  const [allHeroes, set_allHeroes] = useState(_allHeroes)
  const [heroSelected, setHeroSelected] = useState<IDeck>()

  const currentPlayer = players.find(x => x.id === turn.playerId)
  const cardsOfCurrentUser = (allHeroes || []).filter(x => x.playerId === currentUser.id)
  const cardsOfCurrentPlayer = (allHeroes || []).filter(x => x.playerId === turn.playerId)

  const cardsInDeck = (cardsOfCurrentPlayer || []).filter(x => x.status === 0)
  const cardsInHand = (cardsOfCurrentPlayer || []).filter(x => x.status === 1)
  const cardsInBoard = (cardsOfCurrentPlayer || []).filter(x => x.status === 2)

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item >
          <Board
            board={board}
            players={players}
            cardsInBoard={cardsInBoard}
            onSelected={(x, y) => {
              set_allHeroes(allHeroes.map((_a, idx) => {
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
                variant="outlined" onClick={() => setTurn({ ...turn, fase: turn.fase + 1 })}>{turns[turn.fase + 1]}
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
              let border = "1px solid #CCCCCC"
              if (heroSelected?.id === p.id) {
                border = "5px solid blue"
              }

              return (
                <Grid item>
                  <Card sx={{ border, maxWidth: 345, marginTop: (heroSelected == null || heroSelected?.id === p.id) ? 0 : 10 }}>
                    <CardActionArea onClick={() => setHeroSelected(p)}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "#FF0000" }} aria-label="recipe">
                            R
                          </Avatar>
                        }
                        title={p.name}
                        subheader={<Rating size="small" value={4} />}
                      />
                      <CardMedia
                        draggable={false}
                        component="img"
                        height="194"
                        image={p.avatar}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Chip label={`Ataque: ${p.attack}`} />
                          </Grid>
                          <Grid item>
                            <Chip label={`Defesa: ${p.defense}`} />
                          </Grid>
                        </Grid>

                        <Typography variant="body2" color="text.secondary">
                          {p.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
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
                  onClick={() => set_allHeroes(allHeroes.map(_a => {
                    if (_a.id == cardsInDeck[0].id) {
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

export default Game1Play;
