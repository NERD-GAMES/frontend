import React, { useState } from 'react';
import Login from './components/Login';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Router from './pages/router';
import { IUser } from './types';

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
