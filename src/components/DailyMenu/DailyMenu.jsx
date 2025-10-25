import React, { useEffect, useState } from "react";
import ModalWithInput from "../ModalWithInput/ModalWithInput";
import StarRatingForm from "../StarRatingModal/StarRatingModal";
import RegisterUser from "../RegisterUser/RegisterUser";
import { getDailyMenu, getMealOptions } from "../../api";
import Button from "../SharedComponents/Button";
import axios from "axios";
import "./DailyMenu.css";

const DailyMenu = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealOption, setSelectedMealOption] = useState({});
  const [inputMealData, setInputMealData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);
  const [selectedMealForRating, setSelectedMealForRating] = useState(null);
  const [mealRating, setMealRating] = useState([]);

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
    getCurrentUsersRatingForMeal();
  }, []);

  const fetchDailyMenu = async () => {
    try {
      const response = await getDailyMenu();
      setDailyMenu(response?.data);
    } catch (error) {
      console.error("Error fetching daily meals:", error);
    }
  };

  const fetchMealOptions = async () => {
    try {
      const response = await getMealOptions();
      setMealOptions(response?.data);
    } catch (error) {
      console.error("Error fetching meal options:", error);
    }
  };

  const getCurrentUsersRatingForMeal = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentUserId = currentUser?.id;
    if (!currentUserId) {
      setMealRating([]);
      alert("Please register or login to rate the meal.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5175/api/User/userWithRatings/${currentUserId}`
      );
      console.log("User ratings response:", response?.data?.ratings);
      setMealRating(response?.data?.ratings || []);
    } catch (error) {
      console.error("Error fetching user's rating for meal:", error);
    }
  };

  const handleUpdateMeal = (meal, mealOption) => {
    setIsEditMode(true);
    setSelectedMealOption(mealOption);
    setInputMealData(meal);
    setIsModalOpen(true);
  };

  const handleAddMeal = (meal, mealOption) => {
    setIsEditMode(false);
    setSelectedMealOption(mealOption);
    setInputMealData(meal);
    setIsModalOpen(true);
  };

  const handleRateMeal = (todayMeal) => {
    setSelectedMealForRating(todayMeal);
    setIsStarModalOpen(true);
  };

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
                    <p>
                      <span>{todayMeal?.editedMealName}</span>
                      <br />
                      <span>
                        Rating:
                        {mealRating.find((r) => r?.mealId === todayMeal?.id)
                          ?.stars || 0}
                      </span>
                    </p>
                  ) : (
                    <span className="danger-text">No Meal Added</span>
                  )}
                </td>
                <td>
                  {todayMeal?.editedMealName ? (
                    <Button
                      text="Update Meal"
                      onClick={() => handleUpdateMeal(todayMeal, option)}
                    />
                  ) : (
                    <Button
                      text="Add new meal"
                      onClick={() => handleAddMeal(todayMeal, option)}
                    />
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
    <div className="daily-menu-container">
      <h2>Menu of: {today}</h2>
      <RegisterUser
        getCurrentUsersRatingForMeal={getCurrentUsersRatingForMeal}
        fetchDailyMenu={fetchDailyMenu}
      />
      <br />
      <DailyMenuTable />
      <ModalWithInput
        isModalOpen={isModalOpen}
        inputMealData={inputMealData}
        setInputMealData={setInputMealData}
        onClose={() => setIsModalOpen(false)}
        selectedMealOption={selectedMealOption}
        isEditMode={isEditMode}
        fetchDailyMenu={fetchDailyMenu}
      />
      <StarRatingForm
        isStarModalOpen={isStarModalOpen}
        onClose={() => setIsStarModalOpen(false)}
        selectedMealForRating={selectedMealForRating}
        getCurrentUsersRatingForMeal={getCurrentUsersRatingForMeal}
      />
    </div>
  );
};

export default DailyMenu;
