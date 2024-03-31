// login.js
import React, { useState, useEffect } from 'react';
import style from "./login.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import food1 from '../../assets/Images/bg1.jpeg';
import food2 from '../../assets/Images/food2.png';
import food3 from '../../assets/Images/food3.png';
import food4 from '../../assets/Images/food4.png';
import food5 from '../../assets/Images/food5.png';
import { Link } from 'react-router-dom'; // Import Link for routing

const Login = () => {
  const [username, setUsername] = useState('');
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const avatar = createAvatar(adventurer, {
    seed: username.trim() // Using the trimmed username as seed
  });
  
  const svg = avatar.toString();


  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.imageSlider}>
          <img src={food1} alt="Food" className={style.image} />
          
        </div>
        <div className={style.card}>
          <div className={style.avatar} dangerouslySetInnerHTML={{ __html: svg }} />
          <h2 className={style.title}>Welcome Back!</h2>
          <div className={style.input}>
            <input 
              type='text' 
              placeholder='Username' 
              value={username} 
              onChange={handleUsernameChange} 
            />
          </div>
          <div className={style.input}>
            <input type='password' placeholder='Password' />
          </div>
          <button className={style.btn}>Login</button>
          <Link to="/SignUp"> {/* Link to signup page */}
            <button className={`${style.btn} ${style.premiumBtn}`}>Sign Up</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
