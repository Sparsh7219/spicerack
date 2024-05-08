import React, { useState } from 'react';
import style from "./login.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import food1 from '../../assets/Images/bg1.jpeg';
import { Link } from 'react-router-dom'; 
import Axios from 'axios';

const BACKEND_URL = "http://localhost:5000/";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const avatar = createAvatar(adventurer, {
    seed: username.trim()
  });

  const svg = avatar.toString();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await Axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
  
      if (response.data.success) {
        localStorage.setItem('userId', response.data.user_id);
        window.location.href = '/';
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
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
          <Link to="/SignUp">
            <button className={`${style.btn} ${style.premiumBtn}`}>Sign Up</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
