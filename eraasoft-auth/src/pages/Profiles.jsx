import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

function Profile() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        const accessToken = Cookies.get("access_token");
        console.log(accessToken)

        fetch("https://fmb.eraasoft.com/api/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                return response.json();
            })
            .then(() => {
                Cookies.remove('access_token');
                Cookies.remove('user');
                userContext.setUser({});
                navigate("/login");
            })
            .catch((error) => console.log(error));
    }

    const getTasksFromAPI = () => {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);

        axios
            .get(`https://fmb.eraasoft.com/api/tasks?token=${accessToken}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                console.log('Tasks:', response.data);
            })
            .catch((error) => console.log(error));
    };

    const getSingleTaskFromAPI = () => {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);

        axios
            .get(`https://fmb.eraasoft.com/api/tasks/116?token=${accessToken}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                console.log('Tasks:', response.data);
            })
            .catch((error) => console.log(error));
    };

    const storeTask = () => {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);

        axios
            .post(`https://fmb.eraasoft.com/api/tasks?token=${accessToken}`, {
                title: "first tasks",
                description: "hi there"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            .then((response) => {
                console.log('Tasks:', response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getTasksFromAPI()
    }, [])

    if (!Cookies.get('access_token') || !Cookies.get('user')) {
        return (
            <>
                <p>login first</p>
                <Link to="/login">Login</Link>
            </>
        )
    }

    return (
        <div>
            <h1>Welcome, {userContext.user.name}!</h1>
            <p>Your email is: {userContext.user.email}</p>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}

export default Profile;
