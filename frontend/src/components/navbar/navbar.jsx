import React, { useState } from 'react';
import logo from "./../../assets/logo.png";
import styles from "./navbar.module.css"
import { NavLink,Link } from "react-router-dom"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tabName) => {
    setActiveTab(activeTab === tabName ? '' : tabName);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar-logo}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
          </Link>
        </div>
        <ul>
          <li className='nav-item'>
            <NavLink to="/" onClick={() => handleTabClick('Home')} className={activeTab === 'Home' ? 'active' : ''}>
              <HomeRoundedIcon />
              {activeTab === 'Home' && <span>Home</span>}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/Search" onClick={() => handleTabClick('Search')} className={activeTab === 'Search' ? 'active' : ''}>
              <SearchRoundedIcon />
              {activeTab === 'Search' && <span>Search</span>}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/Favorites" onClick={() => handleTabClick('Favorites')} className={activeTab === 'Favorites' ? 'active' : ''}>
              <FavoriteBorderRoundedIcon />
              {activeTab === 'Favorites' && <span>Favorites</span>}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/Setting" onClick={() => handleTabClick('Setting')} className={activeTab === 'Setting' ? 'active' : ''}>
              <PersonIcon />
              {activeTab === 'Setting' && <span>Setting</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar;
