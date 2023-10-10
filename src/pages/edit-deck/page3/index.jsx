import React from 'react';
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
            videoFile: null,
            feedback: '',
        },
        onSubmit: async (values) => {
            // Create references to Firebase Storage and Firestore
            const storageRef = firebase.storage().ref();
            const firestore = firebase.firestore();

            // Store the video file in Firebase Storage
            if (values.videoFile) {
                const videoFileRef = storageRef.child(`${userId}/video/${values.videoFile.name}`);
                await videoFileRef.put(values.videoFile);
            }

            // Store the video feedback in Firestore
            await firestore.collection(userId).doc('VIDEO').set({
                feedback: values.feedback,
            });

            console.log('Form values:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group d-flex">
                <label htmlFor="videoFile">Change Video:</label>
                <input
                    type="file"
                    id="videoFile"
                    name="videoFile"
                    accept=".mp4"
                    style={{ height: '2rem' }}
                    onChange={(event) =>
                        formik.setFieldValue('videoFile', event.currentTarget.files[0])
                    }
                />
            </div>

            <div className="form-group">
                <label htmlFor="feedback">Video Feedback:</label>
                <textarea
                    id="feedback"
                    name="feedback"
                    value={formik.values.feedback}
                    onChange={formik.handleChange}
                ></textarea>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
