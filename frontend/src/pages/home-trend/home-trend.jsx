import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ImageSlider from "../../components/Slider/ImageSlider";

import food1 from "../../assets/Images/food1.png";
import food2 from "../../assets/Images/food2.png";
import food3 from "../../assets/Images/food3.png";
import food4 from "../../assets/Images/food4.png";
import food5 from "../../assets/Images/food5.png";
import style from "./home.module.css"

const Images = [food1, food2, food3, food4, food5];

function Home() {
  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          width: "100%,",
          height: "500px",
          margin: "0 auto",
        }}
      >
        <ImageSlider imageurls={Images} />
      </div>
lorem*12
      <Footer />
    </>
  );
}

export default Home;
