import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import UserContext from "../context/UserContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .post("https://fmb.eraasoft.com/api/login", {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const currentUser = {
                    name: response.data.user.name,
                    email: response.data.user.email
                }
                const expiresAt = Date.now() + response.data.token.expires_in * 60 * 1000;
                Cookies.set("access_token", response.data.token.access_token, {
                    expires: expiresAt,
                    secure: true,
                    sameSite: "strict",
                });
                Cookies.set("user", JSON.stringify(currentUser), {
                    expires: expiresAt,
                    secure: true,
                    sameSite: "strict",
                });
                userContext.setUser(currentUser);

                navigate("/profile");
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    if (Cookies.get('access_token') && Cookies.get('user')) {
        return <Navigate to="/profile" replace />;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
                <Link to="/register">Don't have account? Register</Link>
            </form>
        </div>
    );
}

export default Login;