import React from 'react';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;