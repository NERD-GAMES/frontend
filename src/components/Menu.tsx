import React from "react";
import { AppBar, Box, Button, Container, Grid, Tab, Tabs } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IUser } from "../types";
import { RootState } from "../store";
import { connect } from "react-redux";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GamepadIcon from "@mui/icons-material/Gamepad";
import StoreIcon from "@mui/icons-material/Store";
import DeckIcon from "@mui/icons-material/Deck";

interface Props {
  currentUser?: IUser
}

const Menu = ({ currentUser }: Props) => {

  const loc = useLocation();
  const nav = useNavigate();

  return (
    <>
      <div style={{ height: 80 }}></div>
      <AppBar
        position="static"
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>

        <Tabs
          value={loc.pathname}
          variant="scrollable"
          textColor="secondary"
          centered
          // allowScrollButtonsMobile
          indicatorColor="secondary"
          onChange={(e, value) => { nav(value) }}>
          <Tab icon={<StoreIcon />} value="/store" label="Loja" />
          <Tab icon={<GamepadIcon />} value="/" label="Batalha" />
          <Tab icon={<DeckIcon />} value="/deck" label="Deck" />
          <Tab disabled icon={<DeckIcon />} value="/rank" label="Rank" />
        </Tabs>
      </AppBar>
    </>
  )
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Menu)