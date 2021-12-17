import { Button, Card, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Input, InputAdornment, MenuItem, Rating, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import api from "../../api";
import CardHero from "../../components/CardHero";
import Title from "../../components/Title";
import { IHero, IHeroPart, IUser } from "../../types";

interface Props {
  currentUser: IUser
  onHide: (refresh?: boolean) => void
  data?: IHero
}

const INITIAL_HERO: IHero = {
  name: "",
  attack: 500,
  defense: 400,
}

const AddOrEditHeroModal = ({ onHide, data, currentUser }: Props) => {
  const [hero, setHero] = useState({ ...INITIAL_HERO, ...data })

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

            <Tabs value={0}>
              <Tab label="Preencha os campos do Herói"></Tab>
              <Tab label="Monte a imagem do herói"></Tab>
            </Tabs>

            <h4>Preencha os campos do herói</h4>
            <Grid container spacing={2}>
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
              {[
                { field: "partHead", label: "Cabeça" },
                { field: "partEyes", label: "Olhos" },
                { field: "partNose", label: "Nariz" },
                { field: "partMouth", label: "Boca" },
                { field: "partBreastplate", label: "Peitoral" },
                { field: "partArmL", label: "Braço esquerdo" },
                { field: "partArmR", label: "Braco direito" },
                { field: "partLegL", label: "Perna esquerda" },
                { field: "partLegR", label: "Perna direita" },
              ].map((componentHero) => {
                const partField = hero[componentHero.field as keyof IHero] as IHeroPart

                return (
                  <>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label={componentHero.label}
                        variant="filled"
                        value={partField?.photosURL && partField?.photosURL.join()}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <label htmlFor={`imput_${componentHero.field}`}>
                                <input
                                  id={`imput_${componentHero.field}`}
                                  type="file"
                                  multiple={true}
                                  onChange={async (e) => {
                                    const files = e.target.files
                                    if (files != null && files.length > 0) {
                                      for (let index = 0; index < files.length; index++) {
                                        const f = files[index];
                                        await api.fileUploader(f, currentUser.id || "sem_id",
                                          (e) => {
                                            const perc = e.bytesTransferred / e.totalBytes
                                            debugger
                                          },
                                          console.log,
                                          (url) => {
                                            setHero({
                                              ...hero,
                                              [componentHero.field]: {
                                                ...partField,
                                                photosURL: [url]
                                              }
                                            })
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
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label={componentHero.label + " (style)"}
                        variant="filled"
                        value={partField?.style}
                        onChange={(e) => setHero({
                          ...hero,
                          [componentHero.field]: {
                            ...partField,
                            style: e.target.value
                          }
                        })}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label={componentHero.label + " (className)"}
                        variant="filled"
                        value={partField?.className}
                        onChange={(e) => setHero({
                          ...hero,
                          [componentHero.field]: {
                            ...partField,
                            className: e.target.value
                          }
                        })}
                      />
                    </Grid>
                  </>
                )
              })}
            </Grid>
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