import React from 'react'

export default function SingleTask({ task }) {
    return (
        <div className='single-task'>
            <p className='task-title'>{task.title}</p>
            <p className='task-description'>{task.description}</p>
            <div className='action-btns-container'>
                <button className='edit-btn'>Edit</button>
                <button className='delete-btn'>Delete</button>
            </div>
        </div>
    )
}
