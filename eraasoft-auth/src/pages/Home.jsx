import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className='home-page'>
            <h1>Task Management System</h1>
            <p>Here, you can easily manage your tasks, you can add new task, edit an existing one, or delete it. Log in now to enjoy all our features.</p>
            <div className='btns'>
                <Link to="/login">Log in</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}
