import React from 'react';
import { useFormik } from 'formik';

const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            logo: '',
            sublogo: '',
            backgroundColorTheme: '',
            textColorTheme: '',
        },
        onSubmit: (values) => {
            // Handle form submission here
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
                    style={{height: '2rem'}}
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
        </form>
    );
};

export default MyForm;
