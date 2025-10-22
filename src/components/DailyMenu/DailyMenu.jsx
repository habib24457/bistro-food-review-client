import React, { useEffect, useState } from "react";
import {
  getDailyMenu,
  getMealOptions,
  editMealName,
  getAllMeals,
} from "../../api";
import axios from "axios";

const DailyMenu = () => {
  const [meals, setMeals] = useState([]);
  const [dailyMenu, setDailyMenu] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);

  useEffect(() => {
    fetchDailyMenu();
    fetchMealOptions();
    fetchAllMeals();
  }, []);

  const fetchDailyMenu = async () => {
    try {
      const response = await getDailyMenu();
      setDailyMenu(response.data);
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

  const fetchAllMeals = async () => {
    try {
      const response = await getAllMeals();
      setMeals(response.data);
      console.log("Fetched all meals:", response.data);
    } catch (error) {
      console.error("Error fetching all meals:", error);
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

  const handleAddMeal = async (mealOption, day, mealId) => {
    console.log("idididiidid", mealId);
    const mealDate = getDateForWeekday(day);
    const mealName = prompt(
      `Enter meal name for ${mealOption.name} on ${day}:`
    );
    if (!mealName || mealName.trim() === "") return;
    try {
      await editMealName(mealId, mealOption.id, mealDate, mealName);
      console.log("Meal added successfully");
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
                //const mealForCell = getMealForMealOptionAndDay(option.id, day);
                return (
                  <td key={colIndex}>
                    <h4>{"API is not integrated yet"}</h4>{" "}
                    <button
                      onClick={() => handleAddMeal(option, day, option.id)}
                    >
                      Add/Update
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

  /*
  const getMealForMealOptionAndDay = (mealOptionId, dayName) => {
    console.log("optionId:", mealOptionId, "and day:", dayName);

    const mealDate = getDateForWeekday(dayName);
    console.log("Computed mealDate:", mealDate);
    console.log(
      "All meals available:",
      meals.find((m) => m.mealOptionId === mealOptionId)
    );

    return meals.find((m) => {
      const sameOption = m.mealOptionId === mealOptionId;
      const sameDate =
        new Date(m.date).toDateString() === mealDate.toDateString();

      return sameOption && sameDate;
    });
  };*/

  return (
    <div>
      <h2>Daily Menu</h2>
      <WeeklyMenuTable />
    </div>
  );
};

export default DailyMenu;
