import './App.css';
import React from 'react';
import {Helmet} from "react-helmet";
import Signup from './components/Signup';
import Login from './components/Login'
import UserCalendar from './components/UserCalendar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calendar appointment app</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Routes>
        <Route path = "*" element = {<Signup />}></Route>
        <Route path="/" element = {<Signup />}></Route>
        <Route path="/signup" element = {<Signup />}></Route>
        <Route path="/signin" element = {<Login />}></Route>
        <Route path="/calendar" element = {<UserCalendar />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
