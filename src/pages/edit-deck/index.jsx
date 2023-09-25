import { useState, useEffect } from 'react';

// components
import Badge from '../../components/badge'
import Breadcrumb from '../../components/breadcrumb'
import SideNav from '../../components/sidenav'
import CarouselComp from '../../components/carousel'
import EditModal from './edit-modal'

// react tostify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react icons
import { AiOutlineLeft } from 'react-icons/ai';

import './style.css'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import firebaseConfig from '../../firebaseConfig.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const EditDeck = () => {
    const [pageCounter, setPageCounter] = useState(1);

    const bgImg = "https://rentblob.blob.core.windows.net/pitch/img/Pitch-Catalyst/home-page-imgs/vector53.png";

    const breadcrumbItems = [
        { text: 'Home', url: '/' },
        { text: 'Edit Deck' },
    ];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);


    return (
        <div style={{ backgroundColor: '#060606', backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', height: '85vh', overflowY: 'none' }} >
            <div className="d-flex justify-content-between p-1">
                <div className="d-flex flex-column">
                    <Breadcrumb items={breadcrumbItems} />
                    <div className="d-flex">
                        <AiOutlineLeft style={{ fontSize: '2rem' }} />
                        <div className="d-flex flex-column mx-2">
                            <h5 className='my-0' >
                                Edit Your <br />
                                <span style={{ color: '#E1FF00' }} >Pitch</span> Deck
                            </h5>
                            <hr style={{
                                border: '1px solid #E1FF00',
                                width: '8rem'
                            }} />
                        </div>
                    </div>
                    <SideNav />
                </div>
                <div className="d-flex mt-1 ">
                    <p className='mx-3 mt-1' >Total <br /> <span style={{ color: '#E1FF00' }}>Slides</span></p>
                    <Badge pageCounter={pageCounter} />
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <div
                    style={{
                        width: '12rem',
                        height: '100vh',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '5rem',
                    }} ></div>
            </div>

            <div
                className='text-center'
                style={{
                    zIndex: '10',
                    position: 'absolute',
                    top: '8rem',
                    width: '100%',
                }}>
                <EditModal pageCounter={pageCounter} />
                <CarouselComp pageCounter={pageCounter} setPageCounter={setPageCounter} />

            </div>
            <ToastContainer position="bottom-center" />
        </div>
    )
}

export default EditDeck