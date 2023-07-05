import React, { useState, useEffect, Fragment } from 'react'
import SingleTask from './SingleTask';
import Cookies from "js-cookie";
import axios from 'axios';
import AddNewTask from './AddNewTask';
import TasksPagination from './TasksPagination';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const getTasksFromAPI = (url = "https://fmb.eraasoft.com/api/tasks?") => {
        const accessToken = Cookies.get('access_token');

        axios
            .get(`${url}token=${accessToken}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                setTasks(response.data.data.data);
                setNextPageUrl(response.data.data.next_page_url);
                setPrevPageUrl(response.data.data.prev_page_url);
                setCurrentPage(response.data.data.current_page);
                setLastPage(response.data.data.last_page);
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
            <AddNewTask getTasksFromAPI={getTasksFromAPI} />
            <div className='tasks-container'>
                {tasks.map(task => {
                    return (
                        <Fragment key={task.id}>
                            <SingleTask task={task} />
                        </Fragment>
                    )
                })}
            </div>
            <TasksPagination currentPage={currentPage}
                lastPage={lastPage}
                prevPageUrl={prevPageUrl}
                nextPageUrl={nextPageUrl}
                getTasksFromAPI={getTasksFromAPI}
            />
        </div>
    )
}
