import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, Tooltip, Typography } from "@mui/material"
import { IHero } from "../types"
import 'animate.css';


interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  hero: IHero
}

const CardHero = ({ onClick, hero }: Props) => {
  const tipo = (hero?.tipo || "").toLocaleUpperCase()
  return (
    <Card sx={{ width: 345, backgroundImage: "url(/frontend/img/bg.jpg)" }} >
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Tooltip title={tipo}>
              <Avatar
                variant="square"
                src={`/frontend/img/${hero?.tipo}.png`}
                imgProps={{
                  draggable: false
                }}
              />
            </Tooltip>
          }
          title={hero.name}
        />
        <CardContent >
          <div
            style={{
              position: "relative", height: 300, border: "1px solid #CCC",
              backgroundColor: "white"
            }}>

            {hero?.parts?.map((partHero) => {
              let style = {}
              try {
                style = JSON.parse(partHero?.style || "")
              } catch (error) {

              }

              return (
                <img
                  alt=""
                  draggable={false}
                  src={partHero?.photosURL && partHero?.photosURL[0]}
                  className={partHero?.className}
                  style={{ ...style, position: "absolute", fill: "yellow" }}
                />
              )
            })}
          </div>


          <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: 4 }}>
            <Grid item>
              <Chip color="secondary" size="small" label={`Ataque: ${hero.attack}`} />
            </Grid>
            <Grid item>
              <Chip color="secondary" size="small" label={`Defesa: ${hero.defense}`} />
            </Grid>
            <Grid item xs={12}>
              <div style={{ backgroundColor: "#FFFD", padding: 8, height: 60 }}>
                <Typography variant="body2" color="text.secondary">
                  {hero.description}
                </Typography>
              </div>
            </Grid>
          </Grid>

        </CardContent>
      </CardActionArea>
    </Card>
  )
}


export default CardHero