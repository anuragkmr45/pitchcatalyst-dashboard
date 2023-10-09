import React from 'react';
import { useFormik } from 'formik';

const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            backgroundColorTheme: '',
            textColorTheme: '',
            cardHeadings: ['', '', '', ''],
            cardTexts: ['', '', '', ''],
            cardImages: [null, null, null, null],
        },
        onSubmit: (values) => {
            // Handle form submission here
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
        </form>
    );
};

export default MyForm;
