import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import { IHero } from "../types";
import HeroTransform from "./HeroTransform";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  hero: IHero;
}

const CardHero = ({ onClick, hero }: Props) => {
  const tipo = (hero?.tipo || "").toLocaleUpperCase();
  return (
    <Card style={{
      backgroundImage: "url(/frontend/img/bg.jpg)", minWidth: "120px",
      width: "18vw",
    }}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          action={
            !hero?.enabled && (
              <Chip color="error" label="Rascunho" variant="filled" />
            )
          }
          avatar={
            <Tooltip title={tipo}>
              <Avatar
                style={{ width: "2vw", height: "2vw" }}
                variant="square"
                src={`/frontend/img/${hero?.tipo}.png`}
                imgProps={{
                  draggable: false,
                }}
              />
            </Tooltip>
          }
          title={hero.name}
        />
        <CardContent style={{ paddingTop: 0, paddingBottom: 8 }}>
          <div style={{ border: "1px solid #CCC", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
            <HeroTransform hero={hero} size={"12vw"} />
          </div>

          <div
            style={{
              backgroundColor: "#FFFD",
              margin: "8px 0",
              border: "1px solid #CCC",
              height: "5vw",
              width: "100%",
              minHeight: "50px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {hero.description}
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Chip
              color="error"
              style={{ fontSize: 10 }}
              size="small"
              label={`ATK: ${hero.attack}`}
            />
            <Chip
              color="warning"
              style={{ fontSize: 10 }}
              size="small"
              label={`DEF: ${hero.defense}`}
            />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardHero;
