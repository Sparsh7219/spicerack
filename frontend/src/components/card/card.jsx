import React, { useState } from "react";
import Heart from "react-animated-heart";
import styles from "./card.module.css";
import fire from "../../assets/fire-flame.gif";
import food from "./../../assets/Images/food1.png";

const Card = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles["recipe-card"]}>
      <img src={food} alt="Recipe" />
      <div className={styles["card-content"]}>
        <h2>Recipe Title</h2>
        <p>Recipe Description</p>
        <div className={styles["calories"]}>
          <img src={fire} alt="Calories" />
          300 calories
        </div>
        <div className={styles["like-button"]}>
          <Heart isClick={isLiked} onClick={() => setIsLiked(!isLiked)} />
        </div>
      </div>
    </div>
  );
};

export default Card;
