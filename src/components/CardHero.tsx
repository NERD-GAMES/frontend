import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Grid, Rating, Tooltip, Typography } from "@mui/material"
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
              let style = {}
              try {
                style = JSON.parse(partField?.style || "")
              } catch (error) {

              }

              return (
                <img
                  alt=""
                  src={partField?.photosURL && partField?.photosURL[0]}
                  className={partField?.className}
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