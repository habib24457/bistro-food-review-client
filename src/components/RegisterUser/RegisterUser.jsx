import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("Please enter both first name and last name.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5175/api/User/createUser",
        { firstName, lastName }
      );

      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setCurrentUser(response.data);
      alert(`User ${response.data.firstName} registered successfully!`);
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Registration failed. Check console for details.");
    }
  };

  const handleRemoveUser = async () => {
    if (!currentUser?.id) return;

    try {
      await axios.delete(
        `http://localhost:5175/api/User/deleteUser/${currentUser.id}`
      );
      alert(`User ${currentUser.firstName} removed successfully!`);
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    } catch (err) {
      console.error("Error removing user:", err);
      alert("Failed to remove user.");
    }
  };

  return currentUser ? (
    <div className="current-user">
      <h3>
        Welcome, {currentUser.firstName} {currentUser.lastName}!
      </h3>
      <button onClick={handleRemoveUser}>Remove user</button>
    </div>
  ) : (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterUser;
