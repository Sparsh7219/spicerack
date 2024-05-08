import React, { useState, useEffect } from 'react';
import style from "./login.module.css";
import Navbar from '../../components/navbar/navbar'; // Assuming you have a Navbar component
import Footer from '../../components/footer/footer'; // Assuming you have a Footer component
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import food1 from '../../assets/Images/bg1.jpeg';

import { Link } from 'react-router-dom'; 
import Axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Added state for password

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const avatar = createAvatar(adventurer, {
    seed: username.trim() // Using the trimmed username as seed
  });

  const svg = avatar.toString();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await Axios.get('http:localhost/api/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Login successful, store user ID in localStorage
        localStorage.setItem('userId', response.data.user_id);
        // Redirect to a different page (e.g., profile page)
        window.location.href = '/profile';
      } else {
        // Handle login failure (e.g., display error message)
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      // Handle errors during the API request
      console.error('Error:', error);
    }
  };

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
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={`${style.btn} ${style.premiumBtn}`} onClick={handleLogin}>Login</button>
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
