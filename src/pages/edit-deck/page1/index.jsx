import React from 'react';
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const MyForm = () => {
    const user = firebase.auth().currentUser; // Get the logged-in user
    const userId = user ? user.uid : ''; // Get the user's UID

    const formik = useFormik({
        initialValues: {
            logo: '',
            sublogo: '',
            backgroundColorTheme: '',
            textColorTheme: '',
        },
        onSubmit: async (values) => {
            // Create references to Firebase Storage and Firestore
            const storageRef = firebase.storage().ref();
            const firestore = firebase.firestore();

            // Store the logo and sublogo images in Firebase Storage
            if (values.logo) {
                const logoRef = storageRef.child(`${userId}/logo/logo.jpg`);
                await logoRef.put(values.logo);
            }
            if (values.sublogo) {
                const sublogoRef = storageRef.child(`${userId}/sublogo/sublogo.jpg`);
                await sublogoRef.put(values.sublogo);
            }

            // Store the background color theme and text color theme in Firestore
            firestore.collection(userId).doc('HOME').set({
                backgroundColorTheme: values.backgroundColorTheme,
                textColorTheme: values.textColorTheme,
            });
            toast.success('Form submitted successfully!', {
                position: 'top-right',
                autoClose: 3000, // Close after 3 seconds
            });
            console.log('Form values:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group d-flex justify-content-around">
                <label htmlFor="logo">Logo:</label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={(event) => formik.setFieldValue('logo', event.currentTarget.files[0])}
                    style={{ height: '2rem' }}
                />
            </div>

            <div className="form-group d-flex justify-content-around">
                <label htmlFor="sublogo">Sublogo:</label>
                <input
                    type="file"
                    id="sublogo"
                    name="sublogo"
                    accept="image/*"
                    onChange={(event) => formik.setFieldValue('sublogo', event.currentTarget.files[0])}
                    style={{ height: '2rem' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="backgroundColorTheme">Background Color Theme:</label>
                <input
                    type="color"
                    id="backgroundColorTheme"
                    name="backgroundColorTheme"
                    value={formik.values.backgroundColorTheme}
                    onChange={formik.handleChange}
                    style={{ height: '2rem' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="textColorTheme">Text Color Theme:</label>
                <input
                    type="color"
                    id="textColorTheme"
                    name="textColorTheme"
                    value={formik.values.textColorTheme}
                    onChange={formik.handleChange}
                    style={{ height: '2rem' }}
                />
            </div>
            <Button
                className='px-5 mx-auto'
                style={{ background: 'black', borderRadius: '1.3rem' }}
                type='submit'>Save</Button>
            <ToastContainer />
        </form>
    );
};

export default MyForm;
