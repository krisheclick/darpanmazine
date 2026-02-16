"use client";
import { useBusinessContext } from '@/context/business_context';
import { Col, Row } from 'react-bootstrap';
import BoxSkeleton from '@/components/common/box/BoxSkeleton';
import EventsBox from '@/components/common/box/Box';
import Styles from './style.module.css';

const BusinessList = () => {
    const {hasLoading, businessData} = useBusinessContext();
    return (
        <div className={Styles.postList}>
            <Row className="rowGap">
                {hasLoading ? (
                    [...Array(6)].map((_, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <BoxSkeleton />
                        </Col>
                    ))
                ) : businessData && businessData.length > 0 ? (
                    businessData.map((value, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <EventsBox
                                tag={value.business_category?.business_category_name}
                                title={value.business_heading}
                                slug={`/business/${value.business_category?.business_category_slug}/${value.business_slug}`}
                                publish_date={value.publish_date}
                                thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.thumbnail?.file_url}`}
                                timestring={true}
                            />
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <h5 className="text-center">Business not found</h5>
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default BusinessList
