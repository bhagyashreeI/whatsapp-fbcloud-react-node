import React from 'react'
import { Link } from 'react-router-dom'

const SubNav = () => {
    return (
        <div>
            <ul className='d-flex justify-content-around list-unstyled'>
                <li className='p-2 bg-info '><Link className=' text-white' to="/create-contact">Add Contact</Link></li>
                <li className='p-2 bg-info  '><Link className='text-white' to="/send-message">Send Message</Link></li>
                <li className='p-2 bg-info '><Link className='text-white' to="/send-bulk-message">Send Bulk Message</Link></li>
                <li className='p-2 bg-info '><Link className=' text-white' to="/create-contact">Chat</Link></li>
            </ul>
        </div>
    )
}

export default SubNav