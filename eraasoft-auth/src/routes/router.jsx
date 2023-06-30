import { createBrowserRouter } from "react-router-dom";
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Root from './root';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
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
        ]
    },
]);

export default router