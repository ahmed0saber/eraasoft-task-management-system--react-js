import React, { useState } from 'react'
import Cookies from "js-cookie";
import axios from 'axios';

export default function SingleTask({ task, getTasksFromAPI }) {
    const [isBeingEdited, setIsBeingEdited] = useState(false)

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

    const editTask = () => {
        setIsBeingEdited(true)
    }

    return (
        <div className='single-task'>
            <p className='task-title' contentEditable={isBeingEdited}>{task.title}</p>
            <p className='task-description' contentEditable={isBeingEdited}>{task.description}</p>
            <div className='action-btns-container'>
                {isBeingEdited ? <button className='confirm-btn'>Confirm</button> 
                : <button className='edit-btn' onClick={() => editTask()}>Edit</button>}
                <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
        </div>
    )
}
