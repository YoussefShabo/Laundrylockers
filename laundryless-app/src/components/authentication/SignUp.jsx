import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with the username
      await updateProfile(user, { displayName: username });

      // Create a user document in Firestore
      await setDoc(doc(db, "customers", user.uid), {
        displayName: username,
        email: user.email,
      });

      // Redirect to the user dashboard
      navigate("/userdash");
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create a user document in Firestore if it doesn't exist
      const userDocRef = doc(db, "customers", user.uid);
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
      }, { merge: true });

      // Redirect to the user dashboard
      navigate("/userdash");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;