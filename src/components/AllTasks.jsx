import React, { useState, Fragment, useEffect } from 'react'
import SingleTask from './SingleTask';
import AddNewTask from './AddNewTask';
import TasksPagination from './TasksPagination';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [nextPageUrl, setNextPageUrl] = useState("")
    const [prevPageUrl, setPrevPageUrl] = useState("")

    const getTasksFromAPI = (url = "https://fmb.eraasoft.com/api/tasks?") => {
        const accessToken = Cookies.get("access_token")

        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                setTasks(response.data.data.data)
                setCurrentPage(response.data.data.current_page)
                setLastPage(response.data.data.last_page)
                setNextPageUrl(response.data.data.next_page_url)
                setPrevPageUrl(response.data.data.prev_page_url)
            })
            .catch(() => {
                alert("Something went wrong, please try again.")
            })
    }

    useEffect(() => {
        getTasksFromAPI()
    }, [])

    return (
        <div className='tasks-section'>
            <h3>All Your Tasks</h3>
            <AddNewTask getTasksFromAPI={getTasksFromAPI}/>
            <div className='tasks-container'>
                {tasks.map(task => {
                    return (
                        <Fragment key={task.id}>
                            <SingleTask task={task} getTasksFromAPI={getTasksFromAPI}/>
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
