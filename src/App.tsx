import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from './components/Login';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Router from './pages/router';
import { RootState } from './store';
import { IUser } from './types';

interface Props {
  currentUser?: IUser
}

function App({ currentUser }: Props) {
  if (!currentUser?.id) {
    return (
      <Login />
    )
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Router />
    </div>
  );
}



function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(App)
