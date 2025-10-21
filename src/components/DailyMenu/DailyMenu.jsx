import React, { useEffect, useState } from "react";
import { getDailyMeals, getMealOptions } from "../../api";

const DailyMenu = () => {
  const [meals, setMeals] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);
  const [mealNameInput, setMealNameInput] = useState({});

  useEffect(() => {
    fetchMeals();
    fetchMealOptions();
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

  const fetchMealOptions = async () => {
    try {
      const response = await getMealOptions();
      setMealOptions(response.data);
      console.log("Fetched meal options:", response.data);
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

  /*const mealOptions = [
    "Grill Sandwiches",
    "Smuts Leibspeise",
    "Just Good Food",
  ];*/

  const handleAddMeal = (meal, option, day) => {
    console.log("Updating meal:", meal);
    console.log("Updating option:", option);
    console.log("Updating day:", day);

    const mealDate = getDateForWeekday(day);
    console.log("Computed meal date:", mealDate);
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
    const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday
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

  console.log("Meals state:", mealOptions);

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
                const meal = getMealForOptionAndDay(option.id, day);
                const hasName = meal?.editedMealName?.trim() !== "";

                return (
                  <td key={colIndex}>
                    {!hasName && (
                      <input
                        type="text"
                        placeholder="Enter meal name"
                        value={mealNameInput[meal?.id] || ""}
                        onChange={(e) =>
                          setMealNameInput((prev) => ({
                            ...prev,
                            [meal?.id]: e.target.value,
                          }))
                        }
                      />
                    )}
                    <button onClick={() => handleAddMeal(meal, option, day)}>
                      Add
                    </button>
                    <button onClick={() => handleUpdateMeal(meal)}>
                      Update
                    </button>
                    <button onClick={() => handleRateMeal(meal)}>⭐</button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const getMealForOptionAndDay = (optionName, dayName) => {
    return meals.find(
      (m) =>
        m.mealOptionName.toLowerCase() === optionName.toLowerCase() &&
        new Date(m.mealDate)
          .toLocaleDateString("de-DE", { weekday: "long" })
          .toLowerCase() === dayName.toLowerCase()
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
