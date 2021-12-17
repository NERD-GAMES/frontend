import React from "react";
import { Routes, Route } from "react-router-dom";
import { IUser } from "../types";
import GamePlay from './game1/GamePlay';
import Rooms from './game1/Rooms';
import Home from "./home";
import Admin from "./admin";

interface Props {
  currentUser: IUser
}

const Routers = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home currentUser={props.currentUser} />} />
      <Route path="/game1" element={<Rooms currentUser={props.currentUser} />} />
      <Route path="/game1/:id" element={<GamePlay currentUser={props.currentUser} />} />
      <Route path="/game1/admin" element={<Admin currentUser={props.currentUser} />} />
    </Routes>
  )
}


export default Routers