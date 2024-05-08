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
        const response = await fetch(`../../../../Backend/app/recipes/${type}.json`);
        
        // Check if the response is not ok
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        
        // Check the content type of the response
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        
        // Parse the JSON data
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipes();
  }, [type]);

  return (
    <div className="recipe-select">
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found for {type} category.</p>
      ) : (
        <>
          <h2>{type} Recipes</h2>
          <div className="recipe-cards">
            {recipes.map((recipe) => (
              <Card key={recipe.id} title={recipe.title} ingredients={recipe.ingredients} image={recipe.image_url} recipeId={recipe.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeSelector;
