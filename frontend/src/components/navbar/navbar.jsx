import React, { useState } from 'react';
import logo from "./../../assets/logo.png";
import styles from "./navbar.module.css"
import { NavLink, Link } from "react-router-dom"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName === activeTab ? '' : tabName);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <NavLink to="/" onClick={() => handleTabClick('Home')} className={`${styles.navLink} ${activeTab === 'Home' ? styles.active : ''}`}>
            <HomeRoundedIcon />
            <span className={`${styles.tabName} ${activeTab === 'Home' ? styles.visible : ''}`}>Home</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/Search" onClick={() => handleTabClick('Search')} className={`${styles.navLink} ${activeTab === 'Search' ? styles.active : ''}`}>
            <SearchRoundedIcon />
            <span className={`${styles.tabName} ${activeTab === 'Search' ? styles.visible : ''}`}>Search</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/Favorites" onClick={() => handleTabClick('Favorites')} className={`${styles.navLink} ${activeTab === 'Favorites' ? styles.active : ''}`}>
            <FavoriteBorderRoundedIcon />
            <span className={`${styles.tabName} ${activeTab === 'Favorites' ? styles.visible : ''}`}>Favorites</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/login" onClick={() => handleTabClick('Login')} className={`${styles.navLink} ${activeTab === 'Login' ? styles.active : ''}`}>
            <PersonIcon />
            <span className={`${styles.tabName} ${activeTab === 'Login' ? styles.visible : ''}`}>Login</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;