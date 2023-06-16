import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div>
            <h1>404, page not found</h1>
            <Link to="/">Back To Home</Link>
        </div>
    )
}
