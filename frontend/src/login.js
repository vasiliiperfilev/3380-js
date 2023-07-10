import { Link } from "react-router-dom";
import LoginImage from "./images/login icon.png";
import "./css/Login.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Login() {
  // const loginWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       console.log(result.user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="login-component animated">
      <div className="login-content">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <button
          type="button"
          className="login-button"
          /*onClick={loginWithGoogle}*/
        >
          Login
        </button>
        <button type="button" className="login-button">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
