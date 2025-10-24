import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isCurrentUserAvailable, setIsCurrentUserAvailable] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setIsCurrentUserAvailable(true);
      const user = JSON.parse(currentUser);
      setCurrentUser(user);
    }
  }, []);

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("Please enter both first name and last name.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5175/api/User/createUser",
        {
          firstName: firstName,
          lastName: lastName,
        }
      );
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setCurrentUser(response.data);
      setIsCurrentUserAvailable(true);
      console.log("Registering user:", response.data);
      alert(`User ${response.data.firstName} registered successfully!`);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleRemoveUser = async () => {
    const userId = currentUser.id;
    if (!userId) {
      alert("No user to remove.");
      setIsCurrentUserAvailable(false);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5175/api/User/deleteUser/${userId}`
      );
      alert(`User ${currentUser.firstName} removed successfully!`);
    } catch (error) {
      console.error("Error removing user:", error);
    }

    localStorage.removeItem("currentUser");
    setIsCurrentUserAvailable(false);
    setCurrentUser({});
  };

  console.log("Current User from localStorage:", currentUser);

  return (
    <>
      {isCurrentUserAvailable ? (
        <div className="current-user">
          <h3>
            Welcome, {currentUser.firstName} {currentUser.lastName}!
          </h3>
          <button onClick={() => handleRemoveUser()}>Remove user</button>
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
      )}
    </>
  );
};

export default RegisterUser;
