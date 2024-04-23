import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/Firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, "PUT");
        setAuthError("");
        const destination = location?.state?.from || "/dashboard";
        history.replace(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // user register
  const registerUser = (email, password, name, agent, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        const newUser = { email, displayName: name, agent };
        setUser(newUser);
        saveUser(email, name, agent, "POST");
        updateProfile(auth.currentUser, {
          displayName: name,
          agent: agent,
        })
          .then(() => {})
          .catch((error) => {});
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  // user login
  const loginUser = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = "/dashboard";
        history.replace(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const auth = getAuth();

    sendPasswordResetEmail(auth, email).then(() => {
      // Password reset email sent!
      // ..
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {})
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName, agent, method) => {
    const user = { email, displayName, agent };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };
  return {
    user,
    signInWithGoogle,
    logOut,
    isLoading,
    error,
    setError,
    loginUser,
    authError,
    registerUser,
    ResetPassword,
  };
};

export default useFirebase;
