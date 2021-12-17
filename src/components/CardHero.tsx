import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, Tooltip, Typography } from "@mui/material"
import { IHero, IHeroPart } from "../types"
import 'animate.css';


interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  hero: IHero
}

const CardHero = ({ onClick, hero }: Props) => {
  const tipo = (hero?.tipo || "").toLocaleUpperCase()
  return (
    <Card sx={{ width: 345 }} >
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Tooltip title={tipo}>
              <Avatar
                src={`/frontend/img/${hero?.tipo}.png`}
                sx={{ padding: 1 }} 
                aria-label="recipe"
              />
                {/* {(tipo?.split("")[0])} */}
              {/* </Avatar> */}
            </Tooltip>
          }
          title={hero.name}
          // subheader={<Rating size="small" value={hero.stars || 0} />}
        />
        <CardContent>
          <div
            style={{ position: "relative", height: 300, border: "1px solid #CCC" }}>

            {hero?.parts?.map((partHero) => {
              let style = {}
              try {
                style = JSON.parse(partHero?.style || "")
              } catch (error) {

              }

              return (
                <img
                  alt=""
                  src={partHero?.photosURL && partHero?.photosURL[0]}
                  className={partHero?.className}
                  style={{ ...style, position: "absolute", fill: "yellow" }}
                />
              )
            })}
          </div>


          <Grid container justifyContent="space-between" style={{ marginTop: 10 }}>
            <Grid item>
              <Chip size="small" label={`Ataque: ${hero.attack}`} />
            </Grid>
            <Grid item>
              <Chip size="small" label={`Defesa: ${hero.defense}`} />
            </Grid>
          </Grid>

          <Typography variant="body2" color="text.secondary">
            {hero.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


export default CardHero