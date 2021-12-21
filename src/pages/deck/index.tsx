import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  Container,
  Fab,
  Grid,
  Icon,
  IconButton,
  Paper,
} from "@mui/material";
import api from "../../api";
import CardHero from "../../components/CardHero";
import Title from "../../components/Title";
import { IHero, IUser } from "../../types";
import BuyHeroModal from "./buyHeroModal";
import PaidIcon from "@mui/icons-material/Paid";
import { connect } from "react-redux";
import { RootState } from "../../store";

interface IModal {
  open: boolean;
  data?: IHero;
}

interface Props {
  currentUser?: IUser;
}

const Heroes = ({ currentUser }: Props) => {
  const [modal, setModal] = useState<IModal>({ open: false });
  const [heroes, setHeroes] = useState<IHero[]>([]);

  const loadHeroes = () => {
    if (currentUser?.id) {
      api.getHerosByUserId(currentUser?.id).then((response) => {
        setHeroes(response);
      });
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      loadHeroes();
    }
  }, []);

  return (
    <>
      <Container>
        <Title title="Meus Heróis" />

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {heroes.map((h) => {
            return (
              <Grid item>
                <Card style={{ padding: 8 }}>
                  <CardActionArea
                    onClick={() => setModal({ open: true, data: h })}
                  >
                    <CardHero hero={h} />
                    <div style={{ padding: 8, textAlign: "center" }}>
                      <Fab
                        variant="extended"
                        size="small"
                        style={{ marginRight: 8 }}
                      >
                        <PaidIcon style={{ marginRight: 8 }} />
                        {h.price || "Free"}
                      </Fab>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {modal.open && (
        <BuyHeroModal
          data={modal.data}
          onHide={(r) => {
            setModal({ open: false });
            if (r === true) loadHeroes();
          }}
        />
      )}
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Heroes);
