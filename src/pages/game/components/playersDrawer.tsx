import { Avatar, Button, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

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
        style: { backgroundColor: "#FFFD", padding: 20 },
      }}
      open={showPlayers.open}
      onClose={() => setShowPlayers({ open: false })}
    >

      <List>

        {players.map((p: any) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar src={p.photoURL} />
                </ListItemIcon>
                <ListItemText primary={p.nickName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

     </Drawer>
  );
};

export default PlayersDrawer;
