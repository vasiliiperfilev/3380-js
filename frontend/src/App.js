import "./css/App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import Main from "./main";
import Login from "./login";
import Trips from "./trips";
import TripDetails from "./tripDetails";
import NewTrip from "./components/NewTrip/NewTrip";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        {/* Protected route for "Trips" */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripDetails/:year/:month/:date" element={<TripDetails />} />
        <Route path="/new-trip" element={<NewTrip />} />
      </Routes>
    </div>
  );
}

export default App;
