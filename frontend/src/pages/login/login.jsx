import React, { useState } from 'react';
import style from "./login.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

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
      </div>
      
    </div>
    <Footer/>
    </>
  );
}

export default Login;
