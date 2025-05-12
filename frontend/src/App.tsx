import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './Home';
import Rooms from './Rooms';
import Login from './Login';
import Signup from './Signup';
import FavoriteRooms from './ListYourRoom';
import Profile from './Profile';

const Layout: React.FC = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list-room" element={<FavoriteRooms />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App; 