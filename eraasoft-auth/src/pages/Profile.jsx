import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import AllTasks from "../components/AllTasks";

function Profile() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        const accessToken = Cookies.get('access_token');

        axios
            .post("https://fmb.eraasoft.com/api/logout", {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
            })
            .then(() => {
                Cookies.remove('access_token');
                Cookies.remove('user');
                userContext.setUser({});
                navigate("/login");
            })
            .catch((error) => console.log(error));
    };

    if (!Cookies.get('access_token') || !Cookies.get('user')) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h1>Welcome, {userContext.user.name}!</h1>
            <p>Your email is: {userContext.user.email}</p>
            <button onClick={() => logout()}>Logout</button>
            <Link to="/settings">Settings</Link>
            <AllTasks />
        </div>
    );
}

export default Profile;
