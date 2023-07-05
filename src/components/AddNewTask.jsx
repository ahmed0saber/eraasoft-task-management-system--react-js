import React, { useState } from 'react'

export default function AddNewTask() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className='add-new-task-section'>
            <p>Fill the following fields to add a new task</p>
            <form className='form' onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="title"
                        id="title"
                        placeholder="Enter task title here"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="description"
                        id="description"
                        placeholder="Enter task description here"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
