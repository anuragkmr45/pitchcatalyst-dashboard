import React, { useState, useEffect } from 'react';

// react bootstrap component
import { Button, Row, Col } from 'react-bootstrap';

// react icons 
import { RiEditBoxFill } from 'react-icons/ri';
import { IoMdAnalytics } from 'react-icons/io';
import { TbWorldCode } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { BsFillCaretDownFill } from 'react-icons/bs'; 

// components
import ServiceCard from '../components/cards/ServiceCard';
import VerticallyCenteredModal from '../components/modal';
import Collaborator from '../components/collaborator';

// utils 
import Logo from '../utils/images/logo.png'

// style
import './style.css'
// import '../utils/elements/infinityLogo'


// ** auth and firebase
import { useAuth } from "./login/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import '../firebaseConfig';

const Home = () => {

    const [modalShow, setModalShow] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [cardVisibility, setCardVisibility] = useState({
        deckEditor: false,
        analytics: false,
        createSubdomain: false,
        pitchAI: false
    });

    useEffect(() => {
        // Trigger the fade-in animation after a delay
        const animationTimeout = setTimeout(() => {
            setFadeIn(true);
        }, 300); // Adjust the delay as needed

        return () => {
            clearTimeout(animationTimeout);
        };
    }, []);

    // useEffect(() => {
    //     document.body.style.overflow = 'hidden';
    //     return () => {
    //         document.body.style.overflow = 'unset';
    //     };
    // }, []);

    useEffect(() => {
        // Function to gradually show each card with a delay
        const showCardWithDelay = (cardName, delay) => {
            setTimeout(() => {
                setCardVisibility(prevVisibility => ({
                    ...prevVisibility,
                    [cardName]: true
                }));
            }, delay);
        };

        showCardWithDelay("deckEditor", 300); // Adjust the delays as needed
        showCardWithDelay("analytics", 400);
        showCardWithDelay("createSubdomain", 500);
        showCardWithDelay("pitchAI", 600);
    }, []);

    const [subDomains, setSubDomians] = useState([])
    const { userId } = useAuth();

    async function fetchSubdomains() {
        try {
            const firestore = firebase.firestore();
            const userDocRef = firestore.collection(userId).doc('subdomains');
            const userDoc = await userDocRef.get();

            if (userDoc.exists) {
                const subdomainsData = userDoc.data();
                const subdomains = Object.values(subdomainsData).filter(
                    (value) => typeof value === 'string'
                );
                setSubDomians(subdomains)
            }

        } catch (error) {
            if (error.message !== "Function Firestore.collection() cannot be called with an empty path.") {
                console.error('Error fetching subdomains:', error);
            }
        }
    }

    const onClickModal = () => {
        fetchSubdomains();
        setModalShow(true);
    }

    return (
        <div className={`fade-in ${fadeIn ? 'active' : ''}`} style={{ overflowX: 'hidden'}}>

            <div className="mainpage-container">
                <div className='text-center'>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="d-flex">
                                <Button
                                    className='px-3'
                                    style={{
                                        backgroundColor: '#0D0E0E',
                                        border: '1px solid white',
                                        borderTopRightRadius: '1.5rem',
                                        borderLeft: 'none',
                                        borderBottom: 'none',
                                        outline: 'none'
                                    }}>
                                    COLLABORATOR
                                    <BsFillCaretDownFill style={{ color: '#E1FF00' }} className='ml-4' />
                                </Button>
                            </div >

                            {/* <VerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            /> */}
                        </div>
                        <img src={Logo} alt="pitch catalyst" style={{ width: '20%' }} />
                        <div>
                            <div className="d-flex">
                                <Button
                                    className='px-3'
                                    style={{
                                        backgroundColor: '#0D0E0E',
                                        border: '1px solid white',
                                        borderTopLeftRadius: '1.5rem',
                                        borderRight: 'none',
                                        borderBottom: 'none',
                                        outline: 'none'
                                    }}

                                    onClick={onClickModal}>
                                    <BsFillCaretDownFill style={{ color: '#E1FF00' }} className='mr-4' />
                                    SUBDOMAINS
                                </Button>
                            </div >

                            <VerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                subDomains={subDomains}
                            />
                        </div>
                    </div>
                </div>
                <div className="service-container d-flex flex-column justify-content-around align-items-center" style={{ overflowY: 'hidden'}} >
                    <div className='index-text'>
                        <p className='text-center' style={{ fontSize: '100%' }} >You Can <b>Track Our Work</b> </p>
                    </div>
                    <Row>
                        <Col>
                            {cardVisibility.deckEditor && (
                                <ServiceCard
                                    navigationLink="/deck-editor"
                                    icon={<RiEditBoxFill />}
                                    titleText="Edit Pitch Deck"
                                    childText="Now You Can Edit Your Animated Pitch Deck Anytime Anywhere"
                                />
                            )}
                        </Col>
                        <Col>
                            {cardVisibility.analytics && (
                                <ServiceCard
                                    navigationLink="/analytics"
                                    icon={<IoMdAnalytics />}
                                    titleText="Analytics"
                                    childText="Now You Can Check Your Appearance Anytime Anywhere"
                                />
                            )}
                        </Col>
                        <Col>
                            {cardVisibility.createSubdomain && (
                                <ServiceCard
                                    navigationLink="/create-subdomain"
                                    icon={<TbWorldCode />}
                                    titleText="Create Subdomain"
                                    childText="Now Present World Wide"
                                />
                            )}
                        </Col>
                        <Col>
                            {cardVisibility.pitchAI && (
                                <ServiceCard
                                    navigationLink="/pitchAI-editor"
                                    icon={<GiArtificialIntelligence />}
                                    titleText="Pitch AI"
                                    childText="Make Your Deck Best Presentable Using AI Tools"
                                />
                            )}
                        </Col>
                    </Row>
                    <Collaborator />
                </div>
            </div>
        </div >

    );
};

export default Home;
