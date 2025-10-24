import React, { useEffect, useState } from "react";
import ModalWithInput from "../ModalWithInput/ModalWithInput";
import { getDailyMenu, getMealOptions } from "../../api";
import "./DailyMenu.css";

const DailyMenu = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputMealData, setInputMealData] = useState({});

  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const tableHeader = ["Beilage/Salat", today];

  useEffect(() => {
    fetchDailyMenu();
    fetchMealOptions();
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

  const handleUpdateMeal = (meal) => {
    setInputMealData(meal);
    setIsModalOpen(true);
  };

  const handleRateMeal = async (todayMeal) => {
    console.log("Rating meal:", todayMeal);
    // Implement rating functionality here
  };

  const handleAddMeal = async (option) => {};

  const DailyMenuTable = () => {
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

            return (
              <tr key={option.id}>
                <td>{option.name}</td>
                <td>
                  {todayMeal ? (
                    <span>{todayMeal?.editedMealName}</span>
                  ) : (
                    <span className="danger-text">Not Meal Added</span>
                  )}
                </td>
                <td>
                  {todayMeal?.editedMealName ? (
                    <button onClick={() => handleUpdateMeal(todayMeal)}>
                      Update
                    </button>
                  ) : (
                    <button onClick={() => handleAddMeal(option)}>
                      Add new meal
                    </button>
                  )}
                  <br />
                  <br />
                  <button onClick={() => handleRateMeal(todayMeal)}>⭐</button>
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
      <DailyMenuTable />
      <ModalWithInput
        isModalOpen={isModalOpen}
        inputMealData={inputMealData}
        setInputMealData={setInputMealData}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DailyMenu;
