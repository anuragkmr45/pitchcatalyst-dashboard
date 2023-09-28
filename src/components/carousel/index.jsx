import React, { useState } from 'react';

// react icons 
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

// style 
import './style.css';

// components
import ModalComp from './ModalComp'

// yaha image firestore k sath laganan h
// **------------------------------------------------------------------------------------** //
// **------------------------------------------------------------------------------------** //
// **------------------------------------------------------------------------------------** //
import Img1 from '../../utils/images/decks/1-removebg-preview.png'
import Img2 from '../../utils/images/decks/2-removebg-preview.png'
import Img3 from '../../utils/images/decks/3-removebg-preview.png'
import Img4 from '../../utils/images/decks/4-removebg-preview.png'
// **------------------------------------------------------------------------------------** //
// **------------------------------------------------------------------------------------** //
// **------------------------------------------------------------------------------------** //
// import Img5 from '../../utils/images/decks/5-removebg-preview.png'

const CarouselComp = ({ pageCounter, setPageCounter }) => {
    const [activeSlide, setActiveSlide] = useState(1);

    const handlePrevSlide = () => {
        if (activeSlide > 1) {
            setActiveSlide(activeSlide - 1);
            setPageCounter((prevCounter) => prevCounter - 1);
        }
    };

    const handleNextSlide = () => {
        if (activeSlide < 4) { // Assuming you have 5 items (change this number accordingly)
            setActiveSlide(activeSlide + 1);
            setPageCounter((prevCounter) => prevCounter + 1);
        }
    };


    return (
        <div className="carosuel">
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
            {/* <input
                type="radio"
                name="position"
                checked={activeSlide === 5}
                onChange={() => setActiveSlide(5)}
            /> */}

            <main id="carousel">
                <div className={`item ${activeSlide === 1 ? 'tilted-item' : ''} ${activeSlide !== 1 ? 'inactive' : ''}`}>
                    <img src={Img1} alt="" />
                </div>
                <div className={`item ${activeSlide === 2 ? 'tilted-item' : ''} ${activeSlide !== 2 ? 'inactive' : ''}`}>
                    <img src={Img2} alt="" />
                </div>
                <div className={`item ${activeSlide === 3 ? 'tilted-item' : ''} ${activeSlide !== 3 ? 'inactive' : ''}`}>
                    <img src={Img3} alt="" />
                </div>
                <div className={`item ${activeSlide === 4 ? 'tilted-item' : ''} ${activeSlide !== 4 ? 'inactive' : ''}`}>
                    <img src={Img4} alt="" />
                </div>
                {/* <div className={`item ${activeSlide === 5 ? 'tilted-item' : ''} ${activeSlide !== 5 ? 'inactive' : ''}`}>
                    <img src={Img5} alt="" />
                </div> */}
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
