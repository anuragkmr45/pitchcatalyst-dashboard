/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import { MdOutlineCancel } from 'react-icons/md';


import Page1 from '../page1'
import Page2 from '../page2'
import Page3 from '../page3'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

function MyVerticallyCenteredModal(props) {
    const [pageName, setPageName] = useState("");
    const [heading1, setHeading1] = useState("");
    const [heading2, setHeading2] = useState("");
    const [heading3, setHeading3] = useState("");

    const handleSaveToFirebase = async (editedContent) => {
        try {
            const user = firebase.auth().currentUser;
            if (!user) {
                console.log("User not authenticated");
                return;
            }

            const userId = user.uid;
            const firestore = firebase.firestore();
            const slideTitle = slideTitles[props.pageCounter - 1]; // Getting the current slide title

            const userDocRef = firestore.collection(userId).doc(slideTitle);
            const userDoc = await userDocRef.get();

            if (userDoc.exists) {
                // Document exists, update its fields
                await userDocRef.update({
                    heading1: editedContent.heading1,
                    heading2: editedContent.heading2,
                    heading3: editedContent.heading3,
                });
            } else {
                // Document does not exist, create a new one
                await userDocRef.set({
                    heading1: editedContent.heading1,
                    heading2: editedContent.heading2,
                    heading3: editedContent.heading3,
                });
            }

            console.log("Content saved to Database successfully!");
        } catch (error) {
            console.error('Error saving to Database:', error);
        }
    };

    const getImageUrl = async (folderName, imageName) => {
        try {
            const user = firebase.auth().currentUser;
            if (!user) {
                console.log("User not authenticated");
                return null;
            }

            const storageRef = firebase.storage().ref();
            const folderName = 'rentainance';
            const userImagesRef = storageRef.child(`${folderName}/${imageName}`);
            const imageUrl = await userImagesRef.getDownloadURL();

            return imageUrl;
        } catch (error) {
            console.error('Error getting image URL:', error);
            return null;
        }
    };
    // const setPageName = useState("");


    const [homeImage, setHomeImage] = useState('');
    const [probImage, setProbImage] = useState('');
    const [solImage, setSolImage] = useState('');
    const [uspImage, setUspImage] = useState('');

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         const user = firebase.auth().currentUser;

    //         if (user) {
    //             const homeImageUrl = await getImageUrl(user.uid, '1-removebg-preview.png');
    //             const probImageUrl = await getImageUrl(user.uid, '2-removebg-preview.png');
    //             const solImageUrl = await getImageUrl(user.uid, '3-removebg-preview.png');
    //             const uspImageUrl = await getImageUrl(user.uid, '4-removebg-preview.png');

    //             setHomeImage(homeImageUrl);
    //             setProbImage(probImageUrl);
    //             setSolImage(solImageUrl);
    //             setUspImage(uspImageUrl);
    //         }
    //     };

    //     fetchImages();
    // }, [props.pageCounter]);

    const handleSaveInModal = async () => {
        try {
            const editedContent = {
                pageName,
                heading1,
                heading2,
                heading3,
            };

            await handleSaveToFirebase(editedContent);
        } catch (error) {
            console.error('Error saving to Database:', error);
        }
    };

    const slideImages = {
        'HOME ': 'https://comforting-melomakarona-5f9cca.netlify.app/',
        'PROBLEM ': 'https://charming-cannoli-992196.netlify.app/',
        'VIDEO ': 'https://playful-hotteok-d66673.netlify.app/',
    };

    const slideTitles = [
        'HOME ',
        'PROBLEM ',
        'VIDEO '
    ];

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='edit-deck-modal'
            style={{ width: '100%' }}
        >
            <Modal.Header style={{ color: 'black ' }}>
                <Modal.Title>
                    <h5> <b>{slideTitles[props.pageCounter - 1]}</b> SLIDE :  </h5>
                    <Formik
                        initialValues={{
                            heading1,
                            heading2,
                            heading3,
                        }}
                        onSubmit={(values) => {
                            // Handle form submission if needed
                        }}
                    >

                    </Formik>
                </Modal.Title>
                <MdOutlineCancel onClick={props.onHide} style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
            </Modal.Header>
            <Modal.Body style={{
                color: 'black',
                height: '50vh',
                width: '100%',
                backgroundColor: 'white'
            }} >
                <Row className='d-flex justify-content-center'>
                    <Col>
                        <iframe
                            style={{
                                height: '100%',
                                background: 'white'
                            }}
                            src={slideImages[slideTitles[props.pageCounter - 1]]}
                            title={slideImages[slideTitles[props.pageCounter - 1]]} frameborder="0"></iframe>
                    </Col>
                    <Col>
                        <div className="scrollable-content" style={{ height: '40vh', overflowY: 'auto' }}>
                            {props.pageCounter === 1 && <Page1 />}
                            {props.pageCounter === 2 && <Page2 />}
                            {props.pageCounter === 3 && <Page3 />}
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            {/* <Modal.Footer className='d-flex justify-content-start'>
                <Button
                    className='px-5 mx-auto'
                    style={{ background: 'black', borderRadius: '1.3rem' }}
                    onClick={handleSaveInModal}>Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

const EditModal = ({ pageCounter, closeModal }) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button
                className='text-center editmodalbtn'
                onClick={() => setModalShow(true)}
                style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
            >
                EDIT <BsPencil />
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                pageCounter={pageCounter}
            />
        </>
    );
}

export default EditModal;
