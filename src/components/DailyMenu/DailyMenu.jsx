import React, { useEffect, useState } from "react";
import { getDailyMeals, getMealOptions } from "../../api";
import axios from "axios";

const DailyMenu = () => {
  const [meals, setMeals] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);

  useEffect(() => {
    fetchMeals();
    fetchMealOptions();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await getDailyMeals();
      setMeals(response.data);
      //console.log("Fetched meals:", response.data);
    } catch (error) {
      console.error("Error fetching daily meals:", error);
    }
  };

  const fetchMealOptions = async () => {
    try {
      const response = await getMealOptions();
      setMealOptions(response.data);
      //console.log("Fetched meal options:", response.data);
    } catch (error) {
      console.error("Error fetching meal options:", error);
    }
  };

  const tableHeader = [
    "Beilage/Salat",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
  ];
  const weekdays = tableHeader.slice(1);

  const handleAddMeal = async (mealOption, day) => {
    const mealDate = getDateForWeekday(day);
    const mealName = prompt(
      `Enter meal name for ${mealOption.name} on ${day}:`
    );
    if (!mealName || mealName.trim() === "") return;
    try {
      await axios.put("http://localhost:5175/api/meal/editName", {
        mealOptionId: mealOption.id,
        mealDate: mealDate,
        editedMealName: mealName,
      });
      console.log("Meal added successfully");
      fetchMeals();
    } catch (error) {
      console.error("Failed to add meal:", error);
      alert("Failed to add meal");
    }
  };

  const getDateForWeekday = (weekdayName) => {
    // Map German weekdays to JS day numbers (0 = Sunday, 1 = Monday)
    const weekdayMap = {
      Sonntag: 0,
      Montag: 1,
      Dienstag: 2,
      Mittwoch: 3,
      Donnerstag: 4,
      Freitag: 5,
      Samstag: 6,
    };

    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = weekdayMap[weekdayName];

    if (targetDay === undefined) {
      throw new Error(`Invalid weekday name: ${weekdayName}`);
    }

    let diff = targetDay - todayDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    return targetDate;
  };

  const handleUpdateMeal = (meal) => {};
  const handleRateMeal = async (meal) => {};

  console.log("Meals state:", meals);

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
          {mealOptions.map((option) => (
            <tr key={option.id}>
              <td>{option.name}</td>
              {weekdays.map((day, colIndex) => {
                return (
                  <td key={colIndex}>
                    <h4>{}</h4>
                    <button onClick={() => handleAddMeal(option, day)}>
                      Add
                    </button>
                    <button onClick={() => handleUpdateMeal(option)}>
                      Update
                    </button>
                    <button onClick={() => handleRateMeal(option)}>⭐</button>
                  </td>
                );
              })}
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
