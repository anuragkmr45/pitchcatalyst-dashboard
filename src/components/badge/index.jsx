import React from 'react';
import Badge from 'react-bootstrap/Badge';

const BadgeComponent = ({ pageCounter, toggleSidebar, sidebarVisible  }) => {

    return (
        <>
        <div onClick={toggleSidebar}>
            <h4>
                <Badge bg="light" text="dark" className="px-lg-3">
                    {pageCounter} /4
                </Badge>
            </h4>
        </div>

        
      {/* Optional: Display a message based on sidebar visibility */}
      {sidebarVisible && <p>Sidebar is visible</p>}
        </>
    );
}

export default BadgeComponent;
