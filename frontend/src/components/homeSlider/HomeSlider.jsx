import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "swiper/css";
import recipes from "../../../../Backend/app/recipes/recipes.json";

import "swiper/css";
import "swiper/css/navigation";

const HomeSlider = () => {
  // Filter recipes starting from ID 361
  const filteredRecipes = recipes.filter((recipe) => recipe.id >= 361);

  const handleClick = (recipeId) => {
    // Store the recipe ID in local storage
    localStorage.setItem("recipeId", recipeId);
  };

  return (
    <div className="slider-container">
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 250,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {filteredRecipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <div className="slide-content">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                width={800}
                className="imgslid"
              />
              <div className="overlay">
                <h2>{recipe.title}</h2>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                {/* Use onClick to trigger handleClick and store recipeId */}
                <Link to="/RecipeDesc">
                  <button onClick={() => handleClick(recipe.id)}>View Recipe</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="tags-container">
        <button className="tag gluten-free">Gluten-Free</button>
        <button className="tag healthy">Healthy</button>
        <button className="tag low-carb">Low Carb</button>
        <button className="tag low-calorie">Low Calorie</button>
        <button className="tag vegan">Vegan</button>
        <button className="tag vegetarian">Vegetarian</button>
      </div>
    </div>
  );
};

export default HomeSlider;
