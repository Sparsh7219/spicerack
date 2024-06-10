import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Heart from "react-animated-heart";
import styles from "./card.module.css";

const Card = ({ title, ingredients, image, recipeId, selectedIngredients }) => {
  const [isLiked, setIsLiked] = useState(false);

  // const handleLikeClick = (e) => {
  //   e.stopPropagation(); // Prevent event propagation to parent elements
  //   setIsLiked(!isLiked); // Toggle the like state
  // };

  // Option 1: Separate Click Targets
  const handleCardClick = () => {
    // Store the recipe ID in localStorage
    localStorage.setItem("recipeId", recipeId); // Assuming the recipe title is unique
  };
  const defaultIngredients = [
    "salt",
    "pepper",
    "oil",
    "butter",
    "sugar",
    "water",
    "garam masala",
    "black pepper",
    "turmeric",
    "chili powder",
    "chili pepper",
    "turmeric powder",
    "ghee"
  ];
  
  const missingIngredients = ingredients.filter(
    (ingredient) =>
      !selectedIngredients.includes(ingredient) &&
      !defaultIngredients.includes(ingredient)
  );
  


  // Option 2: Event Delegation (modify handleCardClick)
  /* const handleCardClick = (e) => {
    if (e.target.classList.contains("like-button")) {
      // Don't store recipe ID and redirect if like button clicked
      e.stopPropagation();
      return;
    }
    // Store the recipe ID and redirect (original logic)
    localStorage.setItem("recipeId", recipeId);
  }; */

  return (
    <Link to="/RecipeDesc" onClick={handleCardClick} className={styles.cardLink}>
      <div className={styles["recipe-card"]}>
        <img src={image} alt="Recipe" />
        <div className={styles["card-content"]}>
          <Link to="/RecipeDesc">
            <h2>{title}</h2>
          </Link>
          <p>Ingredients: {ingredients.join(", ")}</p>
          {missingIngredients.length > 0 && (
            <p style={{ color: "red" }}>
              Missing Ingredients: {missingIngredients.join(", ")}
            </p>
          )}
          {/* Option 1: Separate Click Target
          <div className={styles["like-button"]} onClick={handleLikeClick}>
            <Heart isClick={isLiked} onClick={handleLikeClick} />
          </div> */}

          {/* Option 2: Event Delegation (remove this section if using Option 1) */}
           {/* <div className={styles["like-button"]} onClick={handleLikeClick}>
            <Heart isClick={isLiked} onClick={handleLikeClick} />
          </div>  */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
