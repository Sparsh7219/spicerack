import { useState } from 'react'
import "./../src/index.css"
import Home from "./pages/home-trend/home-trend" 
import Favoraterec from "./pages/favouraterec/favouraterec"
import Login from "./pages/login/login"
import RecipeDesc from "./pages/recipedesc/recipedesc"
import RecipeSelector from "./pages/recipeselect/recipeselect"
import Search from "./pages/searchHome/search-home"
import SignUp from "./pages/signup/signup"


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Favorites" element={<Favoraterec/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/RecipeDesc" element={<RecipeDesc/>}/>
          <Route path="/RecipeSelector" element={<RecipeSelector/>}/>
          <Route path="/Search" element={<Search/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
