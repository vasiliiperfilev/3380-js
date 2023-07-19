import "@fortawesome/fontawesome-free/css/all.css";
import "./css/Login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase-config";
import { navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthUser, setAuthUser] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Use onAuthStateChanged to listen for changes in user authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(true);
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setAuthUser(false);
      }
    });
    // Unsubscribe the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isAuthUser) {
    // Redirect to the "/trips" page if the user is authenticated
    navigate("/trips");
    return null; // Return null to avoid rendering the login component
  }

  return (
    <div className="login-component animated">
      <div className="login-content">
        <input
          type="email"
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="login-button" onClick={signIn}>
          Login
        </button>
        <button type="button" className="login-button" onClick={signUp}>
          Sign up
        </button>
        <hr />
        <a
          className="btn btn-outline-light btn-floating m-1 login-icon"
          href="#"
          onClick={loginWithGoogle}
          role="button"
        >
          <i className="fab fa-google fa-2x"></i>
        </a>
        <a
          className="btn btn-outline-light btn-floating m-1 login-icon"
          href="#"
          onClick={loginWithFacebook}
          role="button"
        >
          <i className="fab fa-facebook fa-2x"></i>
        </a>
      </div>
    </div>
  );
}

export default Login;
