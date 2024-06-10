import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import glutenFree from '../../../../Backend/app/recipes/gluten_free.json';
import healthyRecipes from '../../../../Backend/app/recipes/healthy.json';
import lowCals from '../../../../Backend/app/recipes/low_calorie.json';
import lowCarbs from '../../../../Backend/app/recipes/low_carb.json';
import vegan from '../../../../Backend/app/recipes/vegan.json';
import veg from '../../../../Backend/app/recipes/vegetarian.json';
import styles from "./recipeselect.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

const RecipeSelector = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let recipesData;
        switch (type) {
          case 'gluten_free':
            recipesData = glutenFree;
            
            break;
          case 'healthy':
            recipesData = healthyRecipes;
            break;
          case 'low_calorie':
            recipesData = lowCals;
            break;
          case 'low_carb':
            recipesData = lowCarbs;
            break;
          case 'vegan':
            recipesData = vegan;
            break;
          case 'vegetarian':
            recipesData = veg;
            break;
          default:
            throw new Error('Invalid recipe type');
        }
        setRecipes(recipesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipes();
  }, [type]);

  const handleCardClick = (recipeId) => {
    localStorage.setItem("recipeId", recipeId); // Store recipe ID in localStorage
  };

  return (
    
    <>
    <Navbar/>
    
    <div className={styles["recipe-select"]}>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found for {type} category.</p>
      ) : (
        <>
          <h2 className={styles["recipe-title"]}>{type.toUpperCase()} RECIPES</h2>
          <div className={styles["recipe-cards"]}>
            {recipes.map((recipe, index) => (
              <Link to="/RecipeDesc" key={index} onClick={() => handleCardClick(recipe.id)}>
                <div className={styles["recipe-card"]}>
                  <img src={recipe.image_url} alt={recipe.name} />
                  <div className={styles["card-content"]}>
                    <h3>{recipe.title}</h3>
                    <p>Ingredients:</p>
                    <p>{recipe.ingredients.join(', ')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default RecipeSelector;
