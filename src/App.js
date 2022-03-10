import React from 'react';
// import logo from './trivia.png';
// import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/" component={ Game } />
      <Route path="/settings" component={ Settings } />    
    </Switch>
  );
}
