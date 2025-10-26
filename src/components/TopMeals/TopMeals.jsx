import React, { useState, useEffect } from "react";
import { getTopMeals } from "../../api";
import "./TopMeals.css";

const TopMeals = () => {
  const [topMeals, setTopMeals] = useState([]);

  useEffect(() => {
    fetchTopMeals();
  }, []);

  const fetchTopMeals = async () => {
    try {
      const response = await getTopMeals();
      console.log("Top Meals response:", response?.data);
      setTopMeals(response?.data);
    } catch (error) {
      console.error("Error fetching top meals:", error);
    }
  };

  return (
    <div className="top-meals-container">
      <h2>Top Meals</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Meal Option</th>
            <th>Meal Name</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {topMeals.length > 0 ? (
            topMeals.map((meal) => (
              <tr key={meal?.date + meal?.mealOptionName}>
                <td>{meal?.mealOptionName || "N/A"}</td>
                <td>{meal?.editedMealName || "N/A"}</td>
                <td>
                  {meal?.averageRating != null
                    ? meal.averageRating.toFixed(2)
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No top meals available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopMeals;
