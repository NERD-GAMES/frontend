import React from "react";
import { Routes, Route } from "react-router-dom";
import { IUser } from "../types";
import GamePlay from './game1/GamePlay';
import Rooms from './game1/Rooms';
import Home from "./home";
import Admin from "./admin";
import Store from "./store";



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game1" element={<Rooms />} />
      <Route path="/game1/:id" element={<GamePlay />} />
      <Route path="/game1/admin" element={<Admin />} />
      <Route path="/game1/store" element={<Store />} />
    </Routes>
  )
}


export default Routers