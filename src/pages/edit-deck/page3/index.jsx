import React from 'react';
import { useFormik } from 'formik';

const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            videoFile: null,
            feedback: '',
        },
        onSubmit: (values) => {
            // Handle form submission here
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
        </form>
    );
};

export default MyForm;
