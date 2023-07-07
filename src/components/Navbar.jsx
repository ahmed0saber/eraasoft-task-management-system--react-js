import { useContext } from "react";
import UserContext from "../context/UserContext"
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    const userContext = useContext(UserContext)
    return (
        <header className='navbar'>
            <h2><Link to="/">Task Management System</Link></h2>
            <nav>
                {
                    userContext.user.name ? <span>Hi, {userContext.user.name}!</span> 
                    : <NavLink to="/login">Log in</NavLink>
                }
            </nav>
        </header>
    )
}
