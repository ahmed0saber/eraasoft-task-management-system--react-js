import React from "react";
import AllTasks from "../components/AllTasks";

function Profile() {
    return (
        <div className="profile-container">
            <h1>Welcome, user!</h1>
            <p>Your email is: email</p>
            <button className="logout-btn">Logout</button>
            <AllTasks />
        </div>
    );
}

export default Profile;
