import { useState } from 'react';

import { BsPencil } from 'react-icons/bs';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Formik, Form, Field } from 'formik';

import { MdOutlineCancel } from 'react-icons/md'

import HomeImg from '../../../utils/images/decks/1-removebg-preview.png'
import ProbImg from '../../../utils/images/decks/2-removebg-preview.png'
import SolImg from '../../../utils/images/decks/3-removebg-preview.png'
import USPImg from '../../../utils/images/decks/4-removebg-preview.png'

// import './style.css'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import firebaseConfig from '../../../firebaseConfig.js';

function MyVerticallyCenteredModal(props) {
    // data store to DB
    const [pageName, setPageName] = useState("");
    const [heading1, setHeading1] = useState("");
    const [heading2, setHeading2] = useState("");
    const [heading3, setHeading3] = useState("");
    console.log(setPageName)
    // docs save to firebase
    const handleSaveToFirebase = async (editedContent) => {
        try {
            const user = firebase.auth().currentUser;
            if (!user) {
                console.log("User not authenticated");
                // toast.error("User not authenticated");
                return;
            }

            const userId = user.uid;
            const firestore = firebase.firestore();

            const userDocRef = firestore.collection(userId).doc('deckEdits');
            const userDoc = await userDocRef.get();

            const newCount = userDoc.exists ? userDoc.data().count + 1 : 1;
            const newField = `deckEdit${newCount}`;

            await userDocRef.set({
                [newField]: editedContent,
                count: newCount
            });
            // toast.success("Content saved to Database successfully!");
            console.log("Content saved to Database successfully!");

        } catch (error) {
            // toast.error("An error occurred while saving to Database");
            console.error('Error saving to Database:', error);
        }
    };

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
            // toast.error("An error occurred while saving to Database.");
        }
    };

    const slideImages = {
        'HOME ': HomeImg,
        'PROBLEM ': ProbImg,
        'SOLUTION ': SolImg,
        'USP' : USPImg,
    }
    const slideTitles = [
        'HOME ',
        'PROBLEM ',
        'SOLUTION ',
        'USP ',
        'VIDEO '
    ];

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='edit-deck-modal'
        >
            <Modal.Header style={{ color: 'black ' }}>
                <Modal.Title>
                    <h5> <b>{slideTitles[props.pageCounter - 1]}</b> SLIDE :  </h5>
                    <Formik>
                        <Form>
                            <Field
                                className="border p-3"
                                placeholder='Heading 1'
                                type="text"
                                id="heading1"
                                name="heading1"
                                onClick={e => setHeading1(e.target.value)}
                                style={{
                                    borderRadius: '4px',
                                    backgroundColor: 'inherit',
                                    color: 'white',
                                }}
                            />
                        </Form>
                    </Formik>
                </Modal.Title>
                <MdOutlineCancel onClick={props.onHide} style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
            </Modal.Header>
            <Modal.Body style={{
                color: 'black',
                height: '50vh',
                width: '40rem',
                backgroundColor: 'white'
            }} >
                <div className='d-flex justify-content-center'>
                    <div>
                    <img
                                src={slideImages[slideTitles[props.pageCounter - 1]]}
                                alt=""
                                style={{
                                    width: '100%',
                                    position: 'relative',
                                    right: '8rem'
                                }}
                            />
                    </div>
                    <div>
                        <Formik>
                            <Form className="d-flex flex-column">
                                <div className="d-flex flex-column my-2">
                                    <label htmlFor="heading1"> Heading 1</label>
                                    {/* <label htmlFor="heading1"> {props.pageCounter}</label> */}
                                    <Field
                                        className="border p-3"
                                        placeholder='Heading 1'
                                        type="text"
                                        id="heading1"
                                        name="heading1"
                                        onClick={e => setHeading1(e.target.value)}
                                        style={{
                                            borderRadius: '4px',
                                            backgroundColor: 'inherit',
                                            color: 'white',
                                        }}
                                    />
                                </div>
                                <div className="d-flex flex-column my-3">
                                    <label htmlFor="heading2"> Heading 2</label>
                                    <Field
                                        className="border p-3"
                                        placeholder='Heading 2'
                                        type="text"
                                        id="heading2"
                                        name="heading2"
                                        onClick={e => setHeading2(e.target.value)}
                                        style={{
                                            borderRadius: '4px',
                                            backgroundColor: 'inherit',
                                            color: 'white',
                                        }}
                                    />
                                </div>
                                <div className="d-flex flex-column my-3">
                                    <label htmlFor="heading3"> Heading 3</label>
                                    <Field
                                        className="border p-3"
                                        placeholder='Heading 3'
                                        type="text"
                                        id="heading3"
                                        name="heading3"
                                        onClick={e => setHeading3(e.target.value)}
                                        style={{
                                            borderRadius: '4px',
                                            backgroundColor: 'inherit',
                                            color: 'white',
                                        }}
                                    />
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-start'>
                <Button
                    className='px-5 mx-auto'
                    style={{ background: 'black', borderRadius: '1.3rem' }}
                    onClick={handleSaveInModal}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

const EditModal = ({ pageCounter }) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button
                className='text-center editmodalbtn'
                onClick={() => setModalShow(true)}
                style={{ backgroundColor: 'white', color: 'black', border: '1px solid black'}}
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

export default EditModal