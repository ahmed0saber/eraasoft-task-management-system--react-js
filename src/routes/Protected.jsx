import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
    const userContext = useContext(UserContext);
    if (!userContext.user.name) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
