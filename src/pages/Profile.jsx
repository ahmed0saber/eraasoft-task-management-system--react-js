import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import AllTasks from "../components/AllTasks";

function Profile() {
    const userContext = useContext(UserContext);

    return (
        <div className="profile-container">
            <h1>Welcome, {userContext.user.name}!</h1>
            <p>Your email is: {userContext.user.email}</p>
            <button className="logout-btn">Logout</button>
            <AllTasks />
        </div>
    );
}

export default Profile;
