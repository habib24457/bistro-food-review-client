import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5175/api",
});

export const getDailyMeals = () => api.get("/meal/dailyMenu");
export const getMealOptions = () => api.get("/meal/mealOptions");

export default api;
