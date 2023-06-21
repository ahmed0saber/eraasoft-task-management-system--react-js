import React, { useState, useEffect, Fragment } from 'react'
import SingleTask from './SingleTask';
import Cookies from "js-cookie";
import axios from 'axios';
import AddNewTask from './AddNewTask';

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
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getTasksFromAPI()
    }, [])

    return (
        <div>
            <h3>All Tasks</h3>
            <AddNewTask getTasksFromAPI={getTasksFromAPI}/>
            <div>
                {tasks.map(task => {
                    return (
                        <Fragment key={task.id}>
                            <SingleTask task={task} getTasksFromAPI={getTasksFromAPI}/>
                        </Fragment>
                    )
                })}
            </div>
            <div>
                {currentPage > 1 ? <button onClick={() => getTasksFromAPI(prevPageUrl + "&")}>{currentPage - 1}</button> : <span>.</span>}
                <span>{currentPage}</span>
                {currentPage < lastPage ? <button onClick={() => getTasksFromAPI(nextPageUrl + "&")}>{currentPage + 1}</button> : <span>.</span>}
            </div>
        </div>
    )
}