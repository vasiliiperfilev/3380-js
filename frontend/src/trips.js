import { Link } from "react-router-dom";
export default function Trips() {
  return (
    <div>
      Trips page
      <Link to="/tripDetails">
        <button type="button">Trip Details</button>
      </Link>
    </div>
  );
}
