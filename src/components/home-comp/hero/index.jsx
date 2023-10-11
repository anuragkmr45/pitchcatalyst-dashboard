import React, { useState } from 'react'

import { Button } from 'react-bootstrap';

import { BsFillCaretDownFill } from 'react-icons/bs';

import VerticallyCenteredModal from './../../modal';
import Logo from '../../../utils/images/logo.png'

import { useAuth } from "../../../pages/login/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import '../firebaseConfig';
import '../../../firebaseConfig'

const Hero = () => {
    const [modalShow, setModalShow] = useState(false);
    const [subDomains, setSubDomians] = useState([])

    const onClickModal = () => {
        fetchSubdomains();
        setModalShow(true);
    }

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
    return (
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
            <div className='mt-lg-3'>
                <p className='text-center' style={{ fontSize: '100%' }} >You Can <b>Track Our Work</b> </p>
            </div>
        </div>
    )
}

export default Hero;