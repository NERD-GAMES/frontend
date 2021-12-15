import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { IUser } from "../App";
import Game1 from './game1';
import Home from "./home";

interface Props {
  currentUser: IUser
}

const Routers = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home currentUser={props.currentUser} />} />
      <Route path="/game1" element={<Game1 currentUser={props.currentUser} />} />
    </Routes>
  )
}


export default Routers