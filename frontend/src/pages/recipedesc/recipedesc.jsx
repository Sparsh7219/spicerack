import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { Grid, Paper, Container } from '@mui/material';
import recipes from "../../../../Backend/app/recipes/recipes.json"; // Import recipes JSON
import styles from './RecipeDesc.module.css'; // Import the CSS module

const RecipeDesc = () => {
  // Retrieve recipe ID from local storage
  const recipeId = localStorage.getItem("recipeId");

  // Find the recipe object based on recipe ID
  const recipe = recipes.find((recipe) => recipe.id === parseInt(recipeId));

  return (
    <div>
      <Navbar/>
      <Container className={styles.container}>
        <Grid container spacing={3}>

          {/* First Box */}
          <Grid item xs={12} md={6}>
            <Paper className={styles.box}>
              <h1>{recipe.title}</h1>
              <img src={recipe.image_url} alt={recipe.title} />
            </Paper>
          </Grid>
          {/* Second Box */}
          <Grid item xs={12} md={6}>
            <Paper className={styles.box}>
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
        {/* Rectangle */}
        <div className={styles.rectangle}>
          <h3>Directions</h3>
          <p>{recipe.direction}</p>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default RecipeDesc;
