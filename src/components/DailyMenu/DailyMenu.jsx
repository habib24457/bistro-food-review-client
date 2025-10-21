import React, { useEffect, useState } from "react";
import { getDailyMeals, saveRating } from "../../api";

const DailyMenu = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await getDailyMeals();
      setMeals(response.data);
      console.log("Fetched meals:", response.data);
    } catch (error) {
      console.error("Error fetching daily meals:", error);
    }
  };

  const tableHeader = [
    "Beilage/Salat",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Fritag",
  ];
  const weekdays = tableHeader.slice(1);

  const mealOptions = [
    "Grill Sandwiches",
    "Smuts Leibspeise",
    "Just Good Food",
  ];

  const WeeklyMenuTable = () => {
    return (
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {tableHeader.map((headerItem) => (
              <th key={headerItem}>{headerItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mealOptions.map((option, index) => (
            <tr key={index}>
              <td>{option}</td>

              <td>
                <h5>Essen: </h5>
                <button>Add</button>
                <button>Update</button>
                <button>⭐</button>
              </td>
              <td>
                <h5>Essen: </h5>
                <button>Add</button>
                <button>Update</button>
                <button>⭐</button>
              </td>
              <td>
                <h5>Essen: </h5>
                <button>Add</button>
                <button>Update</button>
                <button>⭐</button>
              </td>
              <td>
                <h5>Essen: </h5>
                <button>Add</button>
                <button>Update</button>
                <button>⭐</button>
              </td>
              <td>
                <h5>Essen: </h5>
                <button>Add</button>
                <button>Update</button>
                <button>⭐</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Daily Menu</h2>
      <WeeklyMenuTable />
    </div>
  );
};

export default DailyMenu;
