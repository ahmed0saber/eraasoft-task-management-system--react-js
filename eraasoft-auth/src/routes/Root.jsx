import React from 'react'
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <header>header</header>
            <Outlet />
            <footer>footer</footer>
        </>
    )
}
