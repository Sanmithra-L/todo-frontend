import React from 'react'
import Nav from './Nav'
import TodoHome from './TodoHome.png'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <Nav />
        <center><img src={TodoHome} alt="Todo Home" /></center>
        <span className='signup'><Link to="/register">get Started</Link></span>
        <h1>To Do App Welcomes you!!</h1>
        
    </div>
  )
}
