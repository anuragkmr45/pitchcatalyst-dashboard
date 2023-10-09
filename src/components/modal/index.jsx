import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
// react bootstrap component
import { Modal, Dropdown, Button } from 'react-bootstrap';

const VerticallyCenteredModal = (props) => {

    const { subDomains } = props;

    const [selectedItem, setSelectedItem] = useState(subDomains[0]); // Initialize with the first element

    const handleItemClick = (index) => {
        // Set the selected item based on the clicked item's index
        setSelectedItem(subDomains[index]);
    };

    useEffect(() => {
        // Update the selectedItem when subDomains changes (e.g., when fetched from the server)
        if (subDomains.length > 0) {
            setSelectedItem(subDomains[0]);
        }
    }, [subDomains]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='text-center' style={{ backgroundColor: 'rgba(225, 255, 0, 1)', color: 'black' }}>
                <Dropdown>
                    <div className="d-flex justify-content-around">
                        <h2 className='text-start'>Choose <br /> Subdomain</h2>
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            style={{ width: '60%', boxShadow: '5px 4px 1px 0px rgba(0, 0, 0, 0.50)', background: 'white', color: 'black' }}>
                            {selectedItem || (subDomains.length > 0 ? subDomains[0] : 'List Of Subdomains')}
                        </Dropdown.Toggle>
                        <Button >
                            <Link to='/create-subdomain' style={{textDecoration: 'none', color: 'white'}}>
                                ADD
                            </Link>
                        </Button>
                    </div>


                    {subDomains && (
                        <Dropdown.Menu>
                            {subDomains.map((data, index) => {
                                return (
                                    <Dropdown.Item key={index} onClick={() => handleItemClick(index)}>{data}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    )}

                </Dropdown>
            </Modal.Body>
        </Modal>
    );
}

export default VerticallyCenteredModal;
