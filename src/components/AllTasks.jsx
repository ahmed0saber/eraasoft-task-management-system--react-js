import React, { useState, useEffect, Fragment } from 'react'
import SingleTask from './SingleTask';
import Cookies from "js-cookie";
import axios from 'axios';
import AddNewTask from './AddNewTask';
import TasksPagination from './TasksPagination';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);

    const getTasksFromAPI = () => {
        const accessToken = Cookies.get('access_token');

        axios
            .get(`https://fmb.eraasoft.com/api/tasks?token=${accessToken}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                setTasks(response.data.data.data);
            })
            .catch(() => {
                alert("Something went wrong, please try again.");
            });
    };

    useEffect(() => {
        getTasksFromAPI()
    }, [])

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
