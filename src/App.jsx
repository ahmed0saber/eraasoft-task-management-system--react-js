import React, { useEffect, useState } from 'react'
import { RouterProvider } from "react-router-dom";
import UserContext from './context/UserContext';
import Cookies from "js-cookie";
import router from './routes/router';

export default function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(getUserFromCookies());
    }, [])

    const getUserFromCookies = () => {
        if (Cookies.get("user")) return JSON.parse(Cookies.get("user"));

        return {};
    }

    return (
        <React.StrictMode>
            <UserContext.Provider value={{ user, setUser }}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </React.StrictMode>
    )
}
