import React, { useState } from "react";
import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, IconButton, InputAdornment, MenuItem, Paper, Tab, Tabs, TextField } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon, PhotoCamera } from "@mui/icons-material";
import api from "../../api";
import CardHero from "../../components/CardHero";
import Title from "../../components/Title";
import { IHero, IHeroPart, IUser } from "../../types";
import { cloneDeep } from 'lodash';

interface Props {
  currentUser: IUser
  onHide: (refresh?: boolean) => void
  data?: IHero
}

const INITIAL_HERO: IHero = {
  name: "",
  attack: 500,
  defense: 400,
  parts: [{ type: "head" }]
}

const AddOrEditHeroModal = ({ onHide, data, currentUser }: Props) => {
  const [tab, setTab] = useState(0)
  const [hero, setHero] = useState(cloneDeep({ ...INITIAL_HERO, ...data }))

  const onSave = async () => {
    await api.addOrUpdateHero(hero)
    onHide(true)
  }

  return (
    <Dialog open maxWidth="lg" fullWidth onClose={() => onHide()}>
      <DialogTitle>
        <Title title="Cadastro de heroi" />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs>

            <Tabs value={tab} onChange={(a, b) => setTab(b)}>
              <Tab label="Gerais"></Tab>
              <Tab label="Montagem"></Tab>
            </Tabs>
            {tab === 0 &&
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="Nome do Herói"
                    variant="filled"
                    value={hero?.name}
                    onChange={(e) => setHero({ ...hero, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Tipo"
                    variant="filled"
                    value={hero.tipo || ""}
                    onChange={(e) => setHero({ ...hero, tipo: e.target.value })}
                    select>
                    <MenuItem value="peao">Peão</MenuItem>
                    <MenuItem value="torre">Torre</MenuItem>
                    <MenuItem value="cavalo">Cavalo</MenuItem>
                    <MenuItem value="bispo">Bispo</MenuItem>
                    <MenuItem value="rainha">Rainha</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Poder de Ataque"
                    variant="filled"
                    type="number"
                    value={hero.attack}
                    onChange={(e) => setHero({ ...hero, attack: parseInt(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Poder de Defesa"
                    variant="filled"
                    type="number"
                    value={hero.defense || ""}
                    onChange={(e) => setHero({ ...hero, defense: parseInt(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Descrição"
                    variant="filled"
                    type="number"
                    value={hero.description || ""}
                    onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  />
                </Grid>
              </Grid>
            }

            {tab === 1 &&
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={12}>
                  <Title title="Montagem" right={(
                    <Fab
                      size="small"
                      variant="extended"
                      onClick={() => {
                        const parts = hero?.parts || []
                        setHero({ ...hero, parts: [...parts, {}] })
                      }} aria-label="add">
                      <AddIcon />
                      Adiconar
                    </Fab>
                  )}
                  />
                </Grid>
                {hero?.parts?.map((partHero, idx) => {
                  return (
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Grid container spacing={2}>
                                {partHero?.photosURL?.map((source, idx2) => {
                                  return (
                                    <Grid item>
                                      <Badge badgeContent={
                                        <IconButton
                                          onClick={(e) => {
                                            const parts = hero.parts as IHeroPart[]
                                            const photosURL = parts[idx].photosURL
                                            photosURL?.splice(idx2, 1)
                                            parts[idx].photosURL = photosURL
                                            setHero({ ...hero, parts })
                                          }}
                                        >
                                          <CloseIcon />
                                        </IconButton>
                                      }>
                                        <img
                                          style={{ maxHeight: 40 }}
                                          aria-label="upload picture"
                                          src={source}
                                        />
                                      </Badge>
                                    </Grid>
                                  )
                                })}
                                <Grid item>
                                  <label htmlFor={`imput_${idx}`}>
                                    <input
                                      id={`imput_${idx}`}
                                      type="file"
                                      multiple={false}
                                      onChange={async (e) => {
                                        const files = e.target.files
                                        if (files != null && files.length > 0) {
                                          for (let index = 0; index < files.length; index++) {
                                            const f = files[index];
                                            await api.fileUploader(f, currentUser.id || "sem_id",
                                              (e) => {
                                                // const perc = e.bytesTransferred / e.totalBytes
                                              },
                                              console.log,
                                              (url) => {
                                                const parts = [...(hero?.parts || [])]
                                                const photosURL = parts[idx].photosURL || []
                                                parts[idx].photosURL = [...photosURL, url]
                                                setHero({ ...hero, parts })
                                              }
                                            )
                                          }
                                        }
                                      }}
                                    />
                                    <IconButton aria-label="upload picture" component="span">
                                      <PhotoCamera />
                                    </IconButton>
                                  </label>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={8}>
                              <Grid container spacing={2}>
                                <Grid item xs={9}>
                                  <TextField
                                    fullWidth
                                    label="Tipo"
                                    variant="filled"
                                    value={partHero?.type}
                                    onChange={(e) => {
                                      const parts = hero.parts as IHeroPart[]
                                      parts[idx].type = e.target.value
                                      setHero({ ...hero, parts })
                                    }}
                                    select>
                                    <MenuItem value="all">Completo</MenuItem>
                                    <MenuItem value="head">Cabeça</MenuItem>
                                    <MenuItem value="body">Corpo</MenuItem>
                                  </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    fullWidth
                                    type="number"
                                    label="Intervalo"
                                    variant="filled"
                                    value={partHero?.interval}
                                    onChange={(e) => {
                                      const parts = hero.parts as IHeroPart[]
                                      parts[idx].interval = parseInt(e.target.value)
                                      setHero({ ...hero, parts })
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Style"
                                    variant="filled"
                                    value={partHero?.style}
                                    onChange={(e) => {
                                      const parts = hero.parts as IHeroPart[]
                                      parts[idx].style = e.target.value
                                      setHero({ ...hero, parts })
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label={"ClassName"}
                                    variant="filled"
                                    value={partHero?.className}
                                    onChange={(e) => {
                                      const parts = hero.parts as IHeroPart[]
                                      parts[idx].className = e.target.value
                                      setHero({ ...hero, parts })
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions style={{ justifyContent: "end" }}>
                          <Fab
                            onClick={(e) => {
                              const parts = hero.parts as IHeroPart[]
                              parts?.splice(idx, 1)
                              setHero({ ...hero, parts })
                            }}
                            color="secondary" size="small" variant="extended">
                            Remover
                          </Fab>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            }
          </Grid>
          <Grid item xs={4}>
            <h4>Preview do Herói</h4>
            <CardHero hero={hero} />
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