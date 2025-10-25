import React, { useState } from "react";
import "./StarRatingModal.css";
import axios from "axios";

const StarRatingForm = ({
  isStarModalOpen,
  onClose,
  selectedMealForRating,
  getCurrentUsersRatingForMeal,
}) => {
  const [rating, setRating] = useState(0);

  if (!isStarModalOpen) return null;

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return alert("Please register first");
    if (!rating) return;
    try {
      const response = await axios.post(
        "http://localhost:5175/api/Rating/saveRating",
        {
          userId: user?.id,
          mealId: selectedMealForRating?.id,
          stars: rating,
        }
      );
      console.log("Rating submitted successfully:", response.data);
      alert("Rating submitted successfully!");
      getCurrentUsersRatingForMeal();
    } catch (error) {
      console.error("Error submitting rating:", error?.response?.data);
      let message = "Submission failed.";

      if (typeof error.response?.data === "string") {
        // Extract everything after "BadHttpRequestException:"
        const match = error.response.data.match(
          /BadHttpRequestException:\s*(.*?)(\r?\n|$)/
        );
        message = match ? match[1].trim() : error.response.data;
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      console.log("Extracted message:", message);
      alert(message);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Rate this Meal</h3>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Enter rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StarRatingForm;
