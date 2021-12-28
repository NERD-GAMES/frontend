import React from "react";
import { Routes, Route } from "react-router-dom";
import { IUser } from "../types";
import GamePlay from './game/GamePlay';
import Rooms from './Rooms';
import Admin from "./admin";
import Store from "./store";
import Deck from "./deck";



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Rooms />} />
      <Route path="/:id" element={<GamePlay />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/store" element={<Store />} />
      <Route path="/deck" element={<Deck />} />
    </Routes>
  )
}


export default Routers