import React, { useState } from 'react';
import Login from './components/Login';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Router from './pages/router';

export interface IDeck {
  id: number
  name: string
  avatar: string
  attack: number
  defense: number
  description: string
  status: number
  x: number
  y: number
  playerId: string
}

export interface IBoard {
  x: number
  y: number
}

export interface IUser {
  id?: string
  email: string
  name: string | null | undefined
  photoURL: string | null | undefined
}

function App() {
  const [currentUser, setCurrentUser] = useState<IUser>()

  if (!currentUser) {
    return (
      <Login setUser={setCurrentUser} />
    )
  }

  return (
    <div>
      <ResponsiveAppBar currentUser={currentUser}/>
      <Router currentUser={currentUser}/>
    </div>
  );
}

export default App;
