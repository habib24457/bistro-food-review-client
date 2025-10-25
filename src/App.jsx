import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import TopMeals from "./components/TopMeals/TopMeals";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-meals" element={<TopMeals />} />
      </Routes>
    </Router>
  );
}

export default App;
