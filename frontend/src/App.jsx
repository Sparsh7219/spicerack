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
import Like from './components/like/like'
import Card from './components/card/card'

function App() {
  

  return (
    <>
      
      <Router classname="background">
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Favorites" element={<Favoraterec/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/RecipeDesc" element={<RecipeDesc/>}/>
    <Route path="/recipeselect/:type" element={<RecipeSelector/>}/> {/* Corrected route path */}
    <Route path="/Search" element={<Search/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/like" element={<Like/>}></Route>
    <Route path="/card" element={<Card/>}></Route>
  </Routes>
</Router>

    </>
  )
}

export default App
