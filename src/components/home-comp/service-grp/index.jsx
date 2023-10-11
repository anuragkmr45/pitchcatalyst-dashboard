import React from 'react'

import ServiceCard from '../../cards/ServiceCard'

import { RiEditBoxFill } from 'react-icons/ri';
import { IoMdAnalytics } from 'react-icons/io';
import { TbWorldCode } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';

import { Row, Col } from 'react-bootstrap';

const ServiceCardGrp = () => {
    return (
        <Row className='mx-auto text-center'>
            <Col>
                <ServiceCard
                    navigationLink="/deck-editor"
                    icon={<RiEditBoxFill />}
                    titleText="Edit Pitch Deck"
                    childText="Edit Your Animated Pitch Deck "
                />
            </Col>
            <Col>
                <ServiceCard
                    navigationLink="/analytics"
                    icon={<IoMdAnalytics />}
                    titleText="Analytics"
                    childText="Now You Can Check Your Appearance"
                />
            </Col>
            <Col>
                <ServiceCard
                    navigationLink="/create-subdomain"
                    icon={<TbWorldCode />}
                    titleText="Create Subdomain"
                    childText="Now Present World Wide"
                />
            </Col>
            <Col>
                <ServiceCard
                    navigationLink="/pitchAI-editor"
                    icon={<GiArtificialIntelligence />}
                    titleText="Pitch AI"
                    childText="Make Your Deck Best Presentable Using AI Tools"
                />
            </Col>
        </Row>
    )
}

export default ServiceCardGrp
