import React, { useState, useEffect, useRef } from "react";
import "./RegisterUser.css";
import Button from "../SharedComponents/Button";
import api from "../../api";

const RegisterUser = ({ getCurrentUsersRatingForMeal, fetchDailyMenu }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const hasAlerted = useRef(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      api
        .get(`/User/userWithRatings/${parsedUser.id}`)
        .then(() => setCurrentUser(parsedUser))
        .catch(() => {
          // if the user doesn't exist anymore in DB, remove from localStorage
          localStorage.removeItem("currentUser");
          setCurrentUser(null);
          if (!hasAlerted.current) {
            alert(
              "❌ Your user account was removed from DB. Please register again."
            );
            hasAlerted.current = true;
          }
        });
    }
  }, []);

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("⚠️ Please enter both first name and last name.");
      return;
    }
    try {
      const response = await api.post("/User/createUser", {
        firstName,
        lastName,
      });

      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setCurrentUser(response.data);
      alert(`✅ User ${response.data.firstName} registered successfully!`);
      getCurrentUsersRatingForMeal();
      setFirstName("");
      setLastName("");
    } catch (err) {
      console.error("Error registering user:", err);
      alert("❌ Registration failed. Check console for details.");
    }
  };

  const handleRemoveUser = async () => {
    if (!currentUser?.id) {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setFirstName("");
      setLastName("");
      alert("❌ No user found locally. Cleared local session.");
      return;
    }

    try {
      await api.delete(`/User/deleteUser/${currentUser.id}`);
      alert(`✅ User ${currentUser.firstName} removed successfully!`);
    } catch (err) {
      console.warn(
        "Delete failed, because user might not exist on server:",
        err
      );
      alert("❌ User not found in the system, clearing local session.");
    }

    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setFirstName("");
    setLastName("");
    getCurrentUsersRatingForMeal();
  };

  const handleAddAnotherUser = () => {
    alert(
      "ℹ️ Adding a new user will only remove the current user from browser's local storage, but it will persist in the DB with ratings."
    );
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    getCurrentUsersRatingForMeal();
  };

  return currentUser ? (
    <div className="current-user">
      <h2>
        Welcome, {currentUser.firstName} {currentUser.lastName}!
      </h2>
      <Button text="Remove user" onClick={handleRemoveUser} />
      <Button text="Add a new user" onClick={handleAddAnotherUser} />
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
