import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register';
import UserContext from './context/UserContext';
import Profile from './pages/Profiles';
import Cookies from "js-cookie";
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />,)
