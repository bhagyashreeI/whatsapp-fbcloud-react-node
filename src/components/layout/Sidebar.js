import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () =>{
    return (
    <nav className="sidebar border-top-0 sub-page-wrapper-sideBar">
        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links list-unstyled">
                    <li className="nav-link">
                        <span className="text nav-text"><Link className=' ' to="/">Dashboard</Link></span>
                    </li>
                    <li className="nav-link">
                        <span className="text nav-text"><Link className='' to="/create-contact">Add Contact</Link></span>
                    </li>
                    <li className="nav-link">
                        <span className="text nav-text"><Link className='' to="/send-message">Send Message</Link></span>
                     </li>
                    <li className="nav-link">
                        <span className="text nav-text"><Link className='' to="/send-bulk-message">Send Bulk Message</Link></span>
                     </li>
                    <li className="nav-link">
                        <span className="text nav-text"><Link className=' ' to="/wa-chat">Chat</Link></span>
                    </li>
                    <li className="nav-link">
                        <span className="text nav-text text-primary">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Sidebar;