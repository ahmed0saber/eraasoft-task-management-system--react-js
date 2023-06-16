import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register';
import UserContext from './context/UserContext';
import Profile from './pages/Profile';
import Cookies from "js-cookie";
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
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
