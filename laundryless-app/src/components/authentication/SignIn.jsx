import React from "react";
import { auth, db, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignIn = () => {
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Check if the customer already exists in Firestore
      const customerDoc = await getDoc(doc(db, "customers", user.uid));

      if (!customerDoc.exists()) {
        // Add the customer to the Firestore "customers" collection
        await setDoc(doc(db, "customers", user.uid), {
          name: user.displayName || "Anonymous",
          email: user.email,
          phone: user.phoneNumber || "",
          createdAt: new Date(),
        });
      }

      alert("Signed in with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleEmailSignIn}>
        <h2>Sign In</h2>
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
