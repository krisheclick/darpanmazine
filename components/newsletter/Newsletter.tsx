import { Col, Row } from 'react-bootstrap'
import Styles from './style.module.css'
import NewsletterForm from './NewsletterForm'
import ImageFunction from '@/utlis/ImageFunction'

const Newsletter = () => {
    return (
        <div className={Styles.newsletterArea}>
            <Row className='align-items-start'>
                <Col xl={6} className={Styles.fullWidth}>
                    <div className={Styles.contentArea}>
                        <ImageFunction
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/week-unwrapped.webp`}
                            alt="Logo"
                            width={230}
                            height={84}
                            className={`flex-shrink-0 ${Styles.logo ?? ''}`}
                        />
                        <div>{`Sign Up to Receive 'The Week Unwrapped' A quick digest of top news, pop culture, South Asian pride, and events — delivered weekly.`}</div>
                    </div>
                </Col>
                <Col xl={6} className={Styles.fullWidth}>
                    <div className={Styles.formArea}>
                        <NewsletterForm />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Newsletter
