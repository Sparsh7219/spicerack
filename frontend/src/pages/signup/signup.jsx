import React, { useState } from 'react';
import style from "./signup.module.css"; // Import your CSS file for styling
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom'; 
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import Axios from 'axios'; // Import Axios


const BACKEND_URL = "http://localhost:5000/";


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log(email,password,username)
      const response = await Axios.post('http://localhost:5000/api/signup', {
        email,
        username,
        password,
      });
  
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error('Error:', error); // Handle errors during the API request
    }
  };
  

  const avatar = createAvatar(adventurer, {
    seed: username.trim() // Using the trimmed username as seed
  });

  const svg = avatar.toString();

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.avatar} dangerouslySetInnerHTML={{ __html: svg }} />
          <h2 className={style.title}>Sign Up</h2>
          <form onSubmit={handleSubmit} className={style.form}>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={email} 
              onChange={handleEmailChange} 
              required 
              className={style.input} 
            />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={username} 
              onChange={handleUsernameChange} 
              required 
              className={style.input} 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={password} 
              onChange={handlePasswordChange} 
              required 
              className={style.input} 
            />
            <button type="submit" className={`${style.btn} ${style.signupBtn}`}>Sign Up</button>
          </form>
          <div className={style.overlay}>Password criteria: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character</div>
          <Link to="/login"> {/* Link to login page */}
            <button className={`${style.btn} ${style.premiumBtn}`}>Login</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
