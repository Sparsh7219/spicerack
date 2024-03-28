import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import recipes from "../../../../Backend/app/recipes/recipes.json";

import "swiper/css";
import "swiper/css/navigation";

const HomeSlider = () => {
  // Filter recipes starting from ID 361
  const filteredRecipes = recipes.filter((recipe) => recipe.id >= 361);

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
                <button>View Recipe</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
