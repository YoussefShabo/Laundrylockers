import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [role, setRole] = useState("driver"); // Default role is 'driver'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Form Data:", {
        name,
        email,
        phone,
        driverLicense,
        role,
      });

      // Create the user's Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      console.log("User UID:", uid);

      // Add the user details to Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        phone,
        driverLicense: driverLicense || null,
        role,
        createdAt: new Date(),
      });

      setSuccess(`User created successfully with role: ${role}`);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Driver License:</label>
          <input
            type="text"
            placeholder={
              role === "admin"
                ? "Optional for Admins"
                : "Required for Drivers and Employees"
            }
            value={driverLicense}
            onChange={(e) => setDriverLicense(e.target.value)}
            required={role === "driver" || role === "employee"} // Mandatory for drivers and employees
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              if (e.target.value === "admin") {
                setDriverLicense(""); // Clear driver license if admin is selected
              }
            }}
          >
            <option value="admin">Admin</option>
            <option value="driver">Driver</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <br />
        <button type="submit">Add User</button>
      </form>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddUser;
