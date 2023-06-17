import React, { useState } from 'react'
import Cookies from "js-cookie";
import axios from 'axios';

export default function AddNewTask({ getTasksFromAPI }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const storeTask = () => {
        const accessToken = Cookies.get('access_token');

        axios
            .post(`https://fmb.eraasoft.com/api/tasks?token=${accessToken}`, {
                title: title,
                description: description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then(() => {
                getTasksFromAPI()
                setTitle("")
                setDescription("")
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        storeTask();
    };

    return (
        <div>
            <p>Fill the following fields to add a new task</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
