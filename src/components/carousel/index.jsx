import React, { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import './style.css';
import ModalComp from './ModalComp';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const CarouselComp = ({ pageCounter, setPageCounter }) => {
    const [activeSlide, setActiveSlide] = useState(1);
    const [imageUrls, setImageUrls] = useState([]);

    const handlePrevSlide = () => {
        if (activeSlide > 1) {
            setActiveSlide(activeSlide - 1);
            setPageCounter((prevCounter) => prevCounter - 1);
        }
    };

    const handleNextSlide = () => {
        if (activeSlide < 4) {
            setActiveSlide(activeSlide + 1);
            setPageCounter((prevCounter) => prevCounter + 1);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            // const storage = firebase.storage();
            const user = firebase.auth().currentUser;

            if (user) {
                // const userId = user.uid;
                const imageRefs = [
                    '1-removebg-preview.png',
                    '2-removebg-preview.png',
                    '3-removebg-preview.png',
                    '4-removebg-preview.png',
                ];

                const urls = await Promise.all(
                    imageRefs.map(async (imageName) => {
                        try {
                            const storageRef = firebase.storage().ref();
                           const folderName = 'rentainance'; 
                           const imageRef = storageRef.child(`${folderName}/${imageName}`);
                            return await imageRef.getDownloadURL();
                        } catch (error) {
                            console.error('Error getting image URL:', error);
                            return null;
                        }
                    })
                );

                setImageUrls(urls);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="carousel">
            <input
                type="radio"
                name="position"
                checked={activeSlide === 1}
                onChange={() => setActiveSlide(1)}
            />
            <input
                type="radio"
                name="position"
                checked={activeSlide === 2}
                onChange={() => setActiveSlide(2)}
            />
            <input
                type="radio"
                name="position"
                checked={activeSlide === 3}
                onChange={() => setActiveSlide(3)}
            />
            <input
                type="radio"
                name="position"
                checked={activeSlide === 4}
                onChange={() => setActiveSlide(4)}
            />

            <main id="carousel" style={{border: '2px solid white'}}>
                {imageUrls.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={`item ${activeSlide === index + 1 ? 'tilted-item' : ''} ${activeSlide !== index + 1 ? 'inactive' : ''
                            }`}
                    >
                        <img src={imageUrl} alt='' />
                    </div>
                ))}
                
            </main>
            <div className="buttons d-flex justify-content-around">
                <button className='nav-btn' onClick={handlePrevSlide} disabled={activeSlide === 1}>
                    <GrFormPrevious />
                </button>
                <ModalComp />
                <button className='nav-btn' onClick={handleNextSlide} disabled={activeSlide === 4}>
                    <GrFormNext />
                </button>
            </div>
        </div>
    );
};

export default CarouselComp;
