import React, { useState } from 'react';
import style from "./login.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import food1 from '../../assets/Images/bg1.jpeg';
import { Link } from 'react-router-dom'; 
import Axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

      if (response.data.message === 'Login successful') {
        localStorage.setItem('username', username);
        window.location.href = '/'; // Redirect to home page after successful login
      } else {
        setError(response.data.message); // Display error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
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
          {error && <p className={style.error}>{error}</p>} {/* Display error message if present */}
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
