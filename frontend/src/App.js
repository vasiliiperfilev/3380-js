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
import PlaceDetail from "./components/NewTrip/components/PlaceDetail/PlaceDetail.jsx"

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        {/* Protected route for "Trips" */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripDetails" element={<TripDetails />} />
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/new-trip/:id" element={<PlaceDetail />} />
      </Routes>
    </div>
  );
}

export default App;
