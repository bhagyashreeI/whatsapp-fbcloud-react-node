import React from 'react'

const Sidebar = () =>{
    return (
            <nav id="sidebarMenu" className="mt-30 w-25 collapse d-lg-block sidebar collapse bg-white show p-3">
                <div className="position-sticky">
                    <div className="list-group list-group-flush  mt-4 ">
                        
                        <a href="#" className="list-group-item list-group-item-action py-2 ripple active">
                            <i className="fas fa-chart-area fa-fw me-3"></i><span>Add Contact</span>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
                        ><i className="fas fa-lock fa-fw me-3"></i><span>Send Message</span></a
                        >
                        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
                        ><i className="fas fa-chart-line fa-fw me-3"></i><span>Send Bulk Message</span></a
                        >
                        
                    </div>
                </div>
            </nav>
    )
}

export default Sidebar;