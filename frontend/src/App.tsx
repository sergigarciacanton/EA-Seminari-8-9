import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import User from './components/User';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';

function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/edit/:userName" element={<User/>} />
        <Route path="/add" element={<CreateUser/>} />
        <Route path="/event" element={<EventList/>} />
        <Route path="/addEvent" element={<CreateEvent/>} />
      </Routes>
    </Router>
  );
}

export default App;
