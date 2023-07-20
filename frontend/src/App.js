import "./css/App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Main from "./main";
import Login from "./login";
import Trips from "./trips";
import TripDetails from "./tripDetails";
import SignUp from "./signUp";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        {/* Protected route for "Trips" */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripDetails/:tripId" element={<TripDetails />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
