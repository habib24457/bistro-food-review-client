import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterUser.css";
import Button from "../SharedComponents/Button";

const RegisterUser = ({ getCurrentUsersRatingForMeal, fetchDailyMenu }) => {
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
      getCurrentUsersRatingForMeal();
      setFirstName("");
      setLastName("");
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
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      getCurrentUsersRatingForMeal();
      setFirstName("");
      setLastName("");
    } catch (err) {
      console.error("Error removing user:", err);
      alert("Failed to remove user.");
    }
  };

  const handleAddAnotherUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    getCurrentUsersRatingForMeal();
  };

  return currentUser ? (
    <div className="current-user">
      <h3>
        Welcome, {currentUser.firstName} {currentUser.lastName}!
      </h3>
      <Button text="Remove user" onClick={handleRemoveUser} />
      <br />
      <br />
      <Button text="Add Another user" onClick={handleAddAnotherUser} />
    </div>
  ) : (
    <div className="current-user">
      <input
        className="input-design"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="input-design"
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button text="Register" onClick={handleRegister} />
    </div>
  );
};

export default RegisterUser;
