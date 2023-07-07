import React, { useState, useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './routes/router';
import UserContext from './context/UserContext';
import Cookies from 'js-cookie';

export default function App() {
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(getUserFromCookies());
    }, [])

    const getUserFromCookies = () => {
        if (Cookies.get("user")) return JSON.parse(Cookies.get("user"));

        return {}
    }

    return (
        <React.StrictMode>
            <UserContext.Provider value={{ user, setUser }}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </React.StrictMode>
    )
}
