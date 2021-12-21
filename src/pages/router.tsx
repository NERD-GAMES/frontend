import React from "react";
import { Routes, Route } from "react-router-dom";
import { IUser } from "../types";
import GamePlay from './game1/GamePlay';
import Rooms from './game1/Rooms';
import Home from "./home";
import Admin from "./admin";
import Store from "./store";
import Deck from "./deck";



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Rooms />} />
      <Route path="/game/:id" element={<GamePlay />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/store" element={<Store />} />
      <Route path="/deck" element={<Deck />} />
    </Routes>
  )
}


export default Routers