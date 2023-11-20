import React from 'react'
import { Link } from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
  return (
    <div>
    <div className='navbar'>
        <div className='navhead'>Todo List</div>
        <nav>
            <ul>
                {/* <li><Link to="/login">Logout</Link></li> */}
                <li><Link to="/">Contact us</Link></li>
                <li><Link to="/">About us</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    </div>


    </div>
  )
}
