import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5175/api",
});

export const baseApiurl = () => "http://localhost:5175/api";
export const getDailyMenu = () => api.get("/meal/dailyMenu");
export const getMealOptions = () => api.get("/meal/mealOptions");
export const getAllMeals = () => api.get("/meal/allMeal");

export default api;
