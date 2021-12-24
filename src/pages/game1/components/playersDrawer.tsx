import { Button, Drawer, Grid } from "@mui/material";

interface Props {
  showPlayers: any;
  setShowPlayers: any;
  players: any;
  currentPlayer: any;
  setTurn: any;
}

const PlayersDrawer = ({
  showPlayers,
  setShowPlayers,
  players,
  currentPlayer,
  setTurn,
}: Props) => {
  return (
    <Drawer
      anchor="left"
      PaperProps={{
        style: { backgroundColor: "#FFF5" },
      }}
      open={showPlayers.open}
      onClose={() => setShowPlayers({ open: false })}
    >
      <Grid container spacing={1} justifyContent="center" direction="column">
        {players.map((p: any) => {
          return (
            <Grid item>
              <Button
                style={{
                  [p.id === currentPlayer?.id
                    ? "backgroundColor"
                    : "borderColor"]: p.color,
                  width: 300,
                }}
                variant={p.id === currentPlayer?.id ? "contained" : "outlined"}
                onClick={() => setTurn({ fase: 0, playerId: p.id })}
              >
                {p.nickName}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Drawer>
  );
};

export default PlayersDrawer;
