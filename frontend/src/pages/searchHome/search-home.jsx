import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import styles from './searchHome.module.css';

const BASE_URL = 'http://localhost:5000/api/search'; // Define base URL for API endpoints

const SearchHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeCount, setRecipeCount] = useState(0);
  const [activeSearchBar, setActiveSearchBar] = useState('ingredient');
  const [isLoading, setIsLoading] = useState(false); // Track loading state for better UX
  const [error, setError] = useState(null); // Store any errors encountered

  const ingredients = [
    "Tomato", "Onion", "Garlic", "Potato", "Carrot", "Broccoli", "Spinach", "Bell Pepper"
    // Add more ingredient suggestions here
  ];

  // Fetch suggested recipes on initial render (optional)
  useEffect(() => {
    const fetchInitialRecipes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL);
        const data = response.data;
        if (response.status === 200) {
          setRecipes(data.recipes);
          setRecipeCount(data.count);
        } else {
          setError('Error fetching initial recipes');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching recipes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialRecipes();
  }, []);

  const handleTagClick = (ingredient) => {
    setSearchQuery('');
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(index, 1);
    setSelectedIngredients(updatedIngredients);
  };

  const searchRecipes = async () => {
    const ingredients = selectedIngredients.join(',');

    if (!ingredients) {
      setError('Please select or enter ingredients to search.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`<span class="math-inline">\{BASE\_URL\}?ingredients\=</span>{ingredients}`);
      const data = response.data;

      if (response.status === 200) {
        setRecipes(data.recipes);
        setRecipeCount(data.count);
        setError(null); // Clear any previous errors
      } else {
        setError(data.message || 'Error fetching recipes.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching recipes.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchByName = async () => {
    const recipeName = searchQuery.trim();

    if (!recipeName) {
      setError('Please enter a recipe name to search.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`<span class="math-inline">\{BASE\_URL\}?recipe\_name\=</span>{recipeName}`);
      const data = response.data;

      if (response.status === 200) {
        setRecipes(data.recipes);
        setRecipeCount(data.count);
        setError(null); // Clear any previous errors
      } else {
        setError(data.message || 'Error fetching recipes.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching recipes.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSearchBar = () => {
    setActiveSearchBar(activeSearchBar === 'ingredient' ? 'recipeName' : 'ingredient');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {activeSearchBar === 'ingredient' ? (
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for ingredients..."
              value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim() !== '') {
                  setSelectedIngredients([...selectedIngredients, searchQuery.trim()]);
                  setSearchQuery('');
                }
              }}
            />
            <ul className={styles.ingredientList}>
              {ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <button onClick={() => handleTagClick(ingredient)}>{ingredient}</button>
                </li>
              ))}
            </ul>
            <div className={styles.selectedIngredients}>
              {selectedIngredients.map((ingredient, index) => (
                <span key={index} className={styles.selectedIngredient}>
                  {ingredient}
                  <button onClick={() => handleRemoveIngredient(index)} className={styles.removeButton}>&times;</button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for recipes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        <div className={styles.searchButtonContainer}>
          <button className={styles.searchButton} onClick={activeSearchBar === 'ingredient' ? searchRecipes : searchByName}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button className={styles.toggleButton} onClick={toggleSearchBar}>
            Search by {activeSearchBar === 'ingredient' ? 'Recipe Name' : 'Ingredients'}
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {recipes.length > 0 && (
          <div className={styles.searchResults}>
            <h2>Found {recipeCount} recipes</h2>
            {/* Display retrieved recipes here (implementation depends on your recipe data structure) */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchHome;