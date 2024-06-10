import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import recipes from "../../../../Backend/app/recipes/recipes.json"; // Adjust path if needed
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSlider.css"; // Import CSS file for styling

const HomeSlider = () => {
  // Filter recipes starting from ID 361
  const filteredRecipes = recipes.filter((recipe) => recipe.id >= 361);

  const handleClick = (recipeId) => {
    // Store the recipe ID in local storage (optional for future use)
    localStorage.setItem("recipeId", recipeId);
  };

  const [selectedRecipeType, setSelectedRecipeType] = useState(null); // Store clicked button text

  const handlebtnClick = (recipeType) => {
    setSelectedRecipeType(recipeType);
    // Navigate to RecipeSelector page with the selected recipe type
    window.location.href = `/recipeselect/${recipeType}`;
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
                <Link to="/RecipeDesc">
                  <button onClick={() => handleClick(recipe.id)}>
                    View Recipe
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="tags-container">
        <button className="tag tag-gluten-free" onClick={() => handlebtnClick("gluten_free")}>
          Gluten-Free
        </button>
        <button className="tag tag-healthy" onClick={() => handlebtnClick("healthy")}>
          Healthy
        </button>
        <button className="tag tag-low-carb" onClick={() => handlebtnClick("low_carb")}>
          Low Carb
        </button>
        <button className="tag tag-low-calorie" onClick={() => handlebtnClick("low_calorie")}>
          Low Calorie
        </button>
        <button className="tag tag-vegan" onClick={() => handlebtnClick("vegan")}>
          Vegan
        </button>
        <button className="tag tag-vegetarian" onClick={() => handlebtnClick("vegetarian")}>
          Vegetarian
        </button>
      </div>
    </div>
  );
};

export default HomeSlider;
