import React, { useState, useRef } from 'react'
import Cookies from "js-cookie";
import axios from 'axios';

export default function SingleTask({ task, getTasksFromAPI }) {
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const titleRef = useRef()
    const descriptionRef = useRef()

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
            .catch((error) => console.log(error));
    }

    const editTask = () => {
        setIsBeingEdited(true)
    }

    const confirmEdit = (id) => {
        const accessToken = Cookies.get('access_token');

        axios
            .put(`https://fmb.eraasoft.com/api/tasks/${id}?token=${accessToken}`, {
                title: titleRef.current.textContent,
                description: descriptionRef.current.textContent,
                priority: "high"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            .then(() => {
                setIsBeingEdited(false)
                getTasksFromAPI()
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className='single-task'>
            <p className='task-title' ref={titleRef} contentEditable={isBeingEdited}>{task.title}</p>
            <p className='task-description' ref={descriptionRef} contentEditable={isBeingEdited}>{task.description}</p>
            <div className='action-btns-container'>
                {isBeingEdited ? <button className='confirm-btn' onClick={() => confirmEdit(task.id)}>Confirm</button> 
                : <button className='edit-btn' onClick={() => editTask()}>Edit</button>}
                <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
        </div>
    )
}
