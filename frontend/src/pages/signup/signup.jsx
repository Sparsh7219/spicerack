import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'

const signup = () => {
  return (
    <div>
      <Navbar/>
      <h2>Signup</h2>
    <form id="signupForm" action="/signup" method="post">
        <input type="email" name="email" placeholder="Email" required/><br/>
        <input type="text" name="username" placeholder="Username" required/><br/>
        <input type="password" name="password" id="password" placeholder="Password" required/><br/>
        <div class="overlay">Password criteria: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character</div>
        <button type="submit">Signup</button>
    </form>
      <Footer />

    </div>
  )
}

export default signup