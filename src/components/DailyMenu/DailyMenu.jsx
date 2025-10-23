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
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchDailyMenu();
    fetchMealOptions();
    fetchAllMeals();
  }, []);

  const fetchDailyMenu = async () => {
    try {
      const response = await getDailyMenu();

      setDailyMenu(response.data);
      console.log("---------------Fetched daily menu:", response.data);
    } catch (error) {
      console.error("Error fetching daily meals:", error);
    }
  };

  const fetchMealOptions = async () => {
    try {
      const response = await getMealOptions();
      setMealOptions(response.data);
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

  const handleUpdateMeal = async (todayMeal) => {};

  const handleRateMeal = async (todayMeal) => {
    console.log("Rating meal:", todayMeal);
    // Implement rating functionality here
  };

  const handleAddMeal = async (option) => {};

  const tableHeader = ["Beilage/Salat", today];

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
          {mealOptions.map((option) => {
            const todayMeal = dailyMenu.find(
              (meal) => meal.mealOptionId === option.id
            );
            console.log(
              "----!!!Today meal for option",
              todayMeal?.editedMealName
            );

            return (
              <tr key={option.id}>
                <td>{option.name}</td>
                <td>
                  {todayMeal ? (
                    <>
                      <span>{todayMeal?.editedMealName}</span>
                      <br />
                      <button onClick={() => handleUpdateMeal(todayMeal)}>
                        Update
                      </button>
                      <button onClick={() => handleRateMeal(todayMeal)}>
                        ⭐
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter meal name"
                        onChange={(e) =>
                          setMeals((prev) => ({
                            ...prev,
                            [option.id]: e.target.value,
                          }))
                        }
                      />
                      <br />
                      <button onClick={() => handleAddMeal(option)}>Add</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
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
