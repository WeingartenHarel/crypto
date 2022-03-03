import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom'

function App() {
 
  
  return (

    <div className="App">
       <img src={logo} className="App-logo" alt="logo" />
       <h1>React App</h1>
       <nav>
        <Link to="/crypto-home">Crypto home</Link>
      </nav>

    </div>
  );
}

export default App;
