import { useState, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import { MdOutlineCancel } from 'react-icons/md';
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

    const [homeImage, setHomeImage] = useState('');
    const [probImage, setProbImage] = useState('');
    const [solImage, setSolImage] = useState('');
    const [uspImage, setUspImage] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const user = firebase.auth().currentUser;

            if (user) {
                const homeImageUrl = await getImageUrl(user.uid, '1-removebg-preview.png');
                const probImageUrl = await getImageUrl(user.uid, '2-removebg-preview.png');
                const solImageUrl = await getImageUrl(user.uid, '3-removebg-preview.png');
                const uspImageUrl = await getImageUrl(user.uid, '4-removebg-preview.png');

                setHomeImage(homeImageUrl);
                setProbImage(probImageUrl);
                setSolImage(solImageUrl);
                setUspImage(uspImageUrl);
            }
        };

        fetchImages();
    }, [props.pageCounter]);

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
        'HOME ': homeImage,
        'PROBLEM ': probImage,
        'SOLUTION ': solImage,
        'USP': uspImage,
    };

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
                                    <Field
                                        className="border p-3"
                                        placeholder='Heading 1'
                                        type="text"
                                        id="heading1"
                                        name="heading1"
                                        value={heading1}
                                        onChange={(e) => setHeading1(e.target.value)}
                                        style={{
                                            borderRadius: '4px',
                                            backgroundColor: 'inherit',
                                            color: 'black',
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
                                        value={heading2}
                                        onChange={(e) => setHeading2(e.target.value)}
                                        style={{
                                            borderRadius: '4px',
                                            backgroundColor: 'inherit',
                                            color: 'black',
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
                                        value={heading3}
                                        onChange={(e) => setHeading3(e.target.value)}
                                        style={{
                                            borderRadius: '4px',
                                            backgroundColor: 'inherit',
                                            color: 'black',
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

export default EditModal;
