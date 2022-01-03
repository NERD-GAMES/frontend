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
import Menu from "../../components/Menu";
import { useBlockchain } from "../../blockchain";

interface IModal {
  open: boolean;
  data?: IHero;
}

interface Props {
  currentUser?: IUser;
}

const Heroes = ({ currentUser }: Props) => {
  const {
    isLoged,
    account,
    balance,
    myTokens,
    getMyTokensFromBlockchain,
    doLogin,
    doMint,
  }: any = useBlockchain()

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
          <Grid item xs={12}>
            {myTokens?.map((tk: string) => {
              return (
                <h3>{tk}</h3>
              )
            })}
          </Grid>
          {heroes.map((h) => {
            return (
              <Grid item>
                <CardHero
                  hero={h}
                  onClick={() => setModal({ open: true, data: h })}
                />
              </Grid>
            );
          })}
        </Grid>
        <Menu />
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
