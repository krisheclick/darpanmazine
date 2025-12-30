import { Col, Row } from 'react-bootstrap'
import Styles from './style.module.css'
import NewsletterForm from './NewsletterForm'
import Image from 'next/image'

const Newsletter = () => {
    return (
        <div className={Styles.newsletterArea}>
            <Row className='align-items-start'>
                <Col xl={6}>
                    <div className={Styles.contentArea}>
                        <figure className={`flex-shrink-0 ${Styles.logo ?? ''}`}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/week-unwrapped.webp`}
                                alt="Logo"
                                width={230}
                                height={84}
                                priority
                                style={{objectFit: "contain"}}
                            />
                        </figure>
                        <div>{`Sign Up to Receive 'The Week Unwrapped' A quick digest of top news, pop culture, South Asian pride, and events — delivered weekly.`}</div>
                    </div>
                </Col>
                <Col xl={6}>
                    <div className={Styles.formArea}>
                        <NewsletterForm />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Newsletter
