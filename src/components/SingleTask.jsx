import React from 'react'
import Cookies from "js-cookie";
import axios from 'axios';

export default function SingleTask({ task, getTasksFromAPI }) {
    const deleteTask = (id) => {
        const accessToken = Cookies.get('access_token');

        axios
            .delete(`https://fmb.eraasoft.com/api/tasks/${id}?token=${accessToken}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            .then(() => {
                getTasksFromAPI()
            })
            .catch(() => {
                alert("Something went wrong, please try again.");
            });
    }

    return (
        <div className='single-task'>
            <p className='task-title'>{task.title}</p>
            <p className='task-description'>{task.description}</p>
            <div className='action-btns-container'>
                <button className='edit-btn'>Edit</button>
                <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
        </div>
    )
}
