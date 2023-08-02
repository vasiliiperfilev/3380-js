import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./config/firebase-config";

function LogoutComponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Redirect to the "/" page after successful logout
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* Your logout button or link */}
      <a onClick={handleLogout}>Logout</a>
    </div>
  );
}

export default LogoutComponent;
