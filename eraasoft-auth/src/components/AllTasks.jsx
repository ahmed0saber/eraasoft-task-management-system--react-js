import React, { useState, useEffect, Fragment } from 'react'
import SingleTask from './SingleTask';
import Cookies from "js-cookie";
import axios from 'axios';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const getTasksFromAPI = (url = "https://fmb.eraasoft.com/api/tasks?") => {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);

        axios
            .get(`${url}token=${accessToken}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                console.log('Tasks:', response.data.data);
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
                {currentPage > 1 ? <button onClick={() => getTasksFromAPI(prevPageUrl + "&")}>{currentPage - 1}</button> : <button>.</button>}
                <span>{currentPage}</span>
                {currentPage < lastPage ? <button onClick={() => getTasksFromAPI(nextPageUrl + "&")}>{currentPage + 1}</button> : <button>.</button>}
            </div>
        </div>
    )
}
