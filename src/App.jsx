import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipeData, setRecipeData] = useState(null);

  // state for cuisine search
  const [cuisine, setCuisine] = useState("");

  // loading state to prevent multiple fetches
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const apiURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=18`;

  function handleSearch() {
    fetchData();
  }

  // fetch recipe by cuisine
  function fetchCuisineData() {
    setLoading(true);
    fetch(cuisineApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => setRecipeData(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }

  function handleCuisineSearch() {
    if (!loading) fetchCuisineData();
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <HomePage
              recipeData={recipeData}
              ingredients={ingredients}
              setIngredients={setIngredients}
              setCuisine={setCuisine}
              handleSearch={handleSearch}
              handleCuisineSearch={handleCuisineSearch}
              loading={loading}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
