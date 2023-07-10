import "./css/App.css";
import Main from "./main";
import Login from "./login";
import Trips from "./trips";
import TripDetails from "./tripDetails";
import SignUp from "./signUp";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripDetails" element={<TripDetails />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
