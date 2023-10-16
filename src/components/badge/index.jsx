import React from 'react';
import Badge from 'react-bootstrap/Badge';

const BadgeComponent = ({ pageCounter, toggleSidebar, sidebarVisible }) => {

    return (
        <>
            <h4>
                <Badge bg="light" text="dark" className="px-lg-3">
                    {pageCounter} /3
                </Badge>
            </h4>
        </>
    );
}

export default BadgeComponent;
