import { useEffect, useState } from "react";
import { auth } from "./config/firebase-config";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return isAuthenticated;
};

export default useAuth;
