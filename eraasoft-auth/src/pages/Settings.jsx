import React from 'react'
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Settings() {
    if (!Cookies.get('access_token') || !Cookies.get('user')) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h1>Settings Page</h1>
        </div>
    )
}
