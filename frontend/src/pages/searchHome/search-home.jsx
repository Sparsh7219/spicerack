import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import styles from "./searchHome.module.css";
import uniqueIngredients from "../../../../Backend/app/recipes/unique_ingredients.json";
import recipetitle from "../../../../Backend/app/recipes/recipe_titles.json";
import Card from "../../components/card/card"; // Import Card component
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BACKEND_URL = "http://localhost:5000/";

const SearchHome = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchByIngredients, setSearchByIngredients] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleIngredientChange = (event) => {
    setSelectedIngredients([...selectedIngredients, event.target.value]);
    setSearchTerm("");
  };

  const handleIngredientRemoval = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const params = {};
      if (selectedIngredients.length > 0 && searchByIngredients) {
        params.ingredients = selectedIngredients.join(",");
      } else if (recipeName) {
        params.recipe_name = recipeName;
      } else {
        setErrorMessage(
          "Please provide ingredients or a recipe name to search."
        );
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/search`, { params });

      if (response.status === 200) {
        setRecipes(response.data.recipes);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching recipes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/default`);
        if (response.status === 200) {
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDefaultRecipes();
  }, []);

  // Filter ingredients based on search term
  const filteredIngredients = uniqueIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Recipe Search</h1>
        <p>
          <b>Default ingredients are:</b>
        </p>
        <p>
          salt, pepper, oil, butter, sugar, water, garam masala, pepper, black
          pepper, turmeric, chili powder, chili pepper, turmeric powder, ghee
        </p>
        <div>
          <br />
          <br />
          <label>
            Search by:
            <br />
            <br />
            <select
              value={searchByIngredients}
              onChange={() => setSearchByIngredients(!searchByIngredients)}
            >
              <option value={true}>Ingredients</option>
              <option value={false}>Recipe Name</option>
            </select>
          </label>
        </div>
        {searchByIngredients ? (
          <div className={styles.searchContainer}>
            <label htmlFor="ingredient">Select an ingredient:</label>
            <br />
            <input
              type="text"
              id="ingredient"
              name="ingredient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for ingredients"
              className={styles.searchInput}
            />
            <select
              multiple
              className={styles.searchInput}
              size={6}
              onChange={handleIngredientChange}
            >
              {filteredIngredients.map((ingredient) => (
                <option key={ingredient} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </select>
            <div className={styles.tagContainer}>
              {selectedIngredients.map((ingredient) => (
                <span key={ingredient} className={styles.tag}>
                  {ingredient}
                  <button
                    onClick={() => handleIngredientRemoval(ingredient)}
                    className={styles.closeIcon}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.searchContainer}>
            <label htmlFor="recipeName">Search by recipe name:</label>
            <br />
            <input
              type="text"
              id="recipeName"
              name="recipe_name"
              value={recipeName}
              onChange={handleRecipeNameChange}
              className={styles.searchInput}
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          Search
        </button>
        <hr />
        <div className={styles.gridContainer}>
          {recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.title}
              className={styles.cardLink}
            >
              <Card
                title={recipe.title}
                ingredients={recipe.ingredients}
                image={recipe.image_url}
                recipeId={recipe.id}
                selectedIngredients={selectedIngredients} // Pass selectedIngredients here
              />
            </Link>
          ))}
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {isLoading && <p>Searching...</p>}
      </div>
      <Footer />
    </>
  );
};

export default SearchHome;
