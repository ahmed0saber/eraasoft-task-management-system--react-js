import React from "react";
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className='navbar'>
            <h2><Link to="/">Task Management System</Link></h2>
            <nav>
                <NavLink to="/login">Log in</NavLink>
            </nav>
        </header>
    )
}
