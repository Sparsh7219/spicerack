import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import KitchenIcon from '@mui/icons-material/Kitchen';

import food1 from "../../assets/Images/food1.png";
import food2 from "../../assets/Images/food2.png";
import food3 from "../../assets/Images/food3.png";
import food4 from "../../assets/Images/food4.png";
import food5 from "../../assets/Images/food5.png";

import HomeSlider from "../../components/homeSlider/HomeSlider";
import { MenuBook } from "@mui/icons-material";
import MicrowaveIcon from '@mui/icons-material/Microwave';

const Images = [food1, food2, food3, food4, food5];

function Home() {
  return (
    <>
      <Navbar />

      <HomeSlider />
      

      <div className="box-container">
        <div className="box">
          <KitchenIcon/>
          <h3>Quick Recipes</h3>
          <p>
            Explore quick and easy recipes tailored to the ingredients you have
            at home. Get inspired and whip up delicious meals in no time!
          </p>
        </div>
        <div className="box">
          <MenuBook />
          <h3>Customized Suggestions</h3>
          <p>
            Receive personalized recipe suggestions based on your available
            ingredients. Say goodbye to recipe hunting and hello to convenience!
          </p>
        </div>
        <div className="box">
          <MicrowaveIcon />
          <h3>Creative Cooking Ideas</h3>
          <p>
            Discover creative cooking ideas and experiment with new flavors
            using what's already in your pantry. Let your culinary imagination
            run wild!
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
