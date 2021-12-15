import { useState } from "react";
import { IUser } from "../../App";
import Game1Play from "./components/play";
import Game1Rooms from "./components/rooms";

interface Props {
  currentUser: IUser
}

const Game1 = ({ currentUser }: Props) => {
  const [room, setRoom] = useState(0)

  if (room === 0) {
    return (
      <Game1Rooms currentUser={currentUser} setRoom={setRoom} />
    )
  }

  return (
    <Game1Play currentUser={currentUser} room={room}/>
  )
}


export default Game1