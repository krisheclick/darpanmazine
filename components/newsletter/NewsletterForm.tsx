import { Col, FormControl } from 'react-bootstrap'
import Styles from './style.module.css';

const NewsletterForm = () => {
    return (
        <form>
            <div className={Styles.formRow}>
                <Col className={Styles.inputColumn}>
                    <div className={Styles.inputColumnGroup}>
                        <FormControl
                            name='first_name'
                            placeholder='First Name'
                        />
                    </div>
                </Col>
                <Col className={Styles.inputColumn}>
                    <div className={Styles.inputColumnGroup}>
                        <FormControl
                            name='email_address'
                            placeholder='Email'
                        />
                    </div>
                </Col>
                <Col className={Styles.inputColumn} style={{flex: "inherit"}}>
                    <div className={Styles.inputColumnGroup}>
                        <button type='submit' className='rj-btn-subscribe'>Subscribe Now</button>
                    </div>
                </Col>
            </div>
        </form>
    )
}

export default NewsletterForm
