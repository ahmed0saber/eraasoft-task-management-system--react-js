import React from 'react'

export default function TasksPagination({
    currentPage,
    lastPage,
    prevPageUrl,
    nextPageUrl,
    getTasksFromAPI,
}) {
    return (
        <div className='tasks-pagination'>
            {currentPage > 1 ? <button onClick={() => getTasksFromAPI(prevPageUrl)}>{currentPage - 1}</button> : <span>..</span>}
            <span>{currentPage}</span>
            {currentPage < lastPage ? <button onClick={() => getTasksFromAPI(nextPageUrl)}>{currentPage + 1}</button> : <span>..</span>}
        </div>
    )
}
