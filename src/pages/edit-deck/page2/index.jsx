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
            backgroundColorTheme: '',
            textColorTheme: '',
            cardHeadings: ['', '', '', ''],
            cardTexts: ['', '', '', ''],
            cardImages: [null, null, null, null],
        },
        onSubmit: async (values) => {
            // Create references to Firebase Storage and Firestore
            const storageRef = firebase.storage().ref();
            const firestore = firebase.firestore();

            // Store the background color theme and text color theme in Firestore
            await firestore.collection(userId).doc('PROBLEM').set({
                backgroundColorTheme: values.backgroundColorTheme,
                textColorTheme: values.textColorTheme,
                cardHeadings: values.cardHeadings,
                cardTexts: values.cardTexts,
            });

            // Store card images in Firebase Storage
            for (let i = 0; i < 4; i++) {
                if (values.cardImages[i]) {
                    const cardImageRef = storageRef.child(`${userId}/cardimage${i + 1}/card-image.jpg`);
                    await cardImageRef.put(values.cardImages[i]);
                }
            }

            console.log('Form values:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
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

            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                    <div className="form-group">
                        <label htmlFor={`cardHeadings[${index}]`}>Card Heading {index + 1}:</label>
                        <input
                            type="text"
                            id={`cardHeadings[${index}]`}
                            name={`cardHeadings[${index}]`}
                            value={formik.values.cardHeadings[index]}
                            onChange={formik.handleChange}
                            style={{ height: '2rem' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`cardTexts[${index}]`}>Card Text {index + 1}:</label>
                        <input
                            type="text"
                            id={`cardTexts[${index}]`}
                            name={`cardTexts[${index}]`}
                            value={formik.values.cardTexts[index]}
                            onChange={formik.handleChange}
                            style={{ height: '2rem' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`cardImages[${index}]`}>Card Image {index + 1}:</label>
                        <input
                            type="file"
                            id={`cardImages[${index}]`}
                            name={`cardImages[${index}]`}
                            accept="image/*"
                            style={{ height: '2rem' }}
                            onChange={(event) =>
                                formik.setFieldValue(`cardImages[${index}]`, event.currentTarget.files[0])
                            }
                        />
                    </div>
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
