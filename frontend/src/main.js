import BackgroundImage from "./images/background.jpg";
import "./css/Main.css";
import { Link } from "react-router-dom";
import Login from "./login";
import { useState, useRef } from "react";

function Main() {
  const backgroundStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const [showForm, setShowForm] = useState(false);
  const blurAreaRef = useRef(null);

  const handleClosing = (event) => {
    if (event.target === blurAreaRef.current) {
      setShowForm(false);
    }
  };

  const handleLoginForm = () => {
    setShowForm(true);
  };

  return (
    <div className="main-container" style={backgroundStyle}>
      <div className="content">
        <p>Let's go</p>
        <button className="button" onClick={handleLoginForm}>
          GET STARTED
        </button>
        {showForm && (
          <div className="login-container">
            <div
              className="blur-background"
              onClick={handleClosing}
              ref={blurAreaRef}
            >
              <div className="login-form">
                <Login />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
