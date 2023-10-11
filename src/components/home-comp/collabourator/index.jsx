import React from 'react'

// react bootstrap component
import { Button, Row, Col, Form } from 'react-bootstrap';

// react icons 
import { TbUsersGroup } from 'react-icons/tb';

const Collabourator = () => {
    return (

        <div
            className='mx-auto'
            style={{
                border: '1px solid #E1FF02',
                borderRadius: '0.5rem',
                width: '65%',
                position: 'sticky',
                top: '0px'
            }}>
            <div className="py-lg-4 py-md-3 mx-auto">
                <div className="d-flex justify-content-around my-auto">
                    <div className='d-flex justify-content-between my-auto'>
                        <div
                            className='my-auto px-2 py-1 mx-2'
                            style={{
                                border: '1px solid rgba(225, 255, 0, 1)',
                                borderRadius: '100%'
                            }} >
                            <TbUsersGroup />
                        </div>
                        <div className='my-auto mx-2'>
                            <p className='mb-0'>COLLABORATOR</p>
                        </div>
                    </div>
                    <div className='my-auto'>
                        <Form inline='true' style={{ position: 'relative' }}>
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        style={{
                                            borderRadius: '2rem',
                                            width: '20rem',
                                            position: 'absolute',
                                            right: '-5.5rem',
                                            backgroundColor: 'inherit',
                                            color: 'white',
                                            boxShadow: '5px 4px 1px 0px rgba(0, 0, 0, 0.50) inset'
                                        }}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        className='py-auto mt-1'
                                        style={{
                                            zIndex: 1,
                                            borderRadius: '1rem',
                                            backgroundColor: '#E1FF00',
                                            color: 'black',
                                            fontSize: '12px'
                                        }}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collabourator
