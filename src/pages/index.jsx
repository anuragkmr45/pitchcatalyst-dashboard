import React, { useState, useEffect } from 'react';
import './style.css'
import Hero from '../components/home-comp/hero';
import ServiceCardGrp from '../components/home-comp/service-grp';
import Collabourator from '../components/home-comp/collabourator';

const Home = () => {

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Trigger the fade-in animation after a delay
        const animationTimeout = setTimeout(() => {
            setFadeIn(true);
        }, 300); // Adjust the delay as needed

        return () => {
            clearTimeout(animationTimeout);
        };
    }, []);

    return (
        <div className={`mainpage-container fade-in${fadeIn ? 'active' : ''}`} style={{ overflowX: 'hidden' }}>
            <Hero />
            <ServiceCardGrp  />
            <Collabourator />
        </div >
    );
};

export default Home;
