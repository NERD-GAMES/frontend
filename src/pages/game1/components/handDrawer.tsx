import { Button, Drawer, Grid } from "@mui/material";
import CardHero from "../../../components/CardHero";

interface Props {
  showCards: any;
  setShowCards: any;
  cardsInHand: any;
  heroSelected: any;
  setHeroSelected: any;
  cardsInDeck: any;
  setHeroes: any;
  heroes: any;
}

const HandDrawer = ({
  showCards,
  setShowCards,
  cardsInHand,
  heroSelected,
  setHeroSelected,
  cardsInDeck,
  setHeroes,
  heroes,
}: Props) => {
  return (
    <Drawer
      anchor="bottom"
      PaperProps={{
        style: { backgroundColor: "#FFF5" },
      }}
      open={showCards.open}
      onClose={() => setShowCards({ open: false })}
    >
      <Grid container spacing={2} justifyContent="center">
        {cardsInHand.map((p: any) => {
          let border = "5px solid #CCCCCC";
          if (heroSelected?.id === p.id) {
            border = "5px solid blue";
          }
          return (
            <Grid item>
              <div style={{ border }}>
                <CardHero
                  hero={p}
                  onClick={() => {
                    if (p.id === heroSelected?.id) {
                      setHeroSelected(undefined);
                    } else {
                      setHeroSelected(p);
                    }
                  }}
                />
              </div>
            </Grid>
          );
        })}

        <Grid item>
          <Button
            size="large"
            variant="outlined"
            style={{
              backgroundImage: cardsInDeck.length
                ? "url(https://img.elo7.com.br/product/zoom/2A58C4E/papel-de-parede-carta-baralho-poquer-jogo-cartas-barbearia-papel-de-parede.jpg)"
                : "",
              border: "1px solid #CCC",
              width: 241 / 3,
              height: 392 / 3,
            }}
            disabled={cardsInDeck.length === 0}
            onClick={() =>
              setHeroes(
                heroes.map((_a: any) => {
                  if (_a.id === cardsInDeck[0].id) {
                    return { ..._a, status: 1 };
                  }
                  return _a;
                })
              )
            }
          >
            DECK
            <br />
            {cardsInDeck.length} cartas
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default HandDrawer;
