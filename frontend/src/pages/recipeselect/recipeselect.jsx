import React, { useState, useEffect } from 'react';
import Card from '../../components/card/card';
import { useParams } from 'react-router-dom';

const RecipeSelector = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { type } = useParams(); // Access recipe type from URL parameter

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`../../../../Backend/app/recipes/${type}.json`); // Adjust path if needed
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-select">
      {error ? (
        <p style={{ color: 'red' }}>Error fetching recipes: {error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found for {type} category.</p>
      ) : (
        <>
          <h2>{type} Recipes</h2>
          {recipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </>
      )}
    </div>
  );
};

export default RecipeSelector;