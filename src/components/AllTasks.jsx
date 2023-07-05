import React, { useState, Fragment } from 'react'
import SingleTask from './SingleTask';
import AddNewTask from './AddNewTask';
import TasksPagination from './TasksPagination';

export default function AllTasks() {
    const [tasks, setTasks] = useState([
        {
            id: "111",
            title: "Learn JavaScript",
            description: "You need to learn JavaScript",
        },
        {
            id: "222",
            title: "Learn React.js",
            description: "You need to learn React.js",
        }
    ]);

    return (
        <div className='tasks-section'>
            <h3>All Your Tasks</h3>
            <AddNewTask />
            <div className='tasks-container'>
                {tasks.map(task => {
                    return (
                        <Fragment key={task.id}>
                            <SingleTask task={task} />
                        </Fragment>
                    )
                })}
            </div>
            <TasksPagination currentPage={2}
                lastPage={4}
                prevPageUrl={"https://ahmed0saber.onrender.com"}
                nextPageUrl={"https://ahmed0saber.onrender.com"}
                getTasksFromAPI={() => {
                    console.log("Hello there")
                }}
            />
        </div>
    )
}
