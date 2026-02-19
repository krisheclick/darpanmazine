"use client";
import Styles from "../post/style.module.css";
import { Col, Row } from "react-bootstrap";
import EventsBox from "../common/box/Box";
import BoxSkeleton from "../common/box/BoxSkeleton";
import { useEventsContext } from "@/context/events_context";

const EventList = () => {
    const { hasLoading, allEvents } = useEventsContext();
    return (
        <>
        <div className={Styles.postList}>
            <Row className="rowGap">
                {hasLoading ? (
                    [...Array(6)].map((_, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <BoxSkeleton />
                        </Col>
                    ))
                ) : allEvents && allEvents.length > 0 ? (
                    allEvents.map((value, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <EventsBox
                                tag={value.category?.category_name}
                                title={value.heading}
                                slug={`/events/${value.category?.permalink}/${value.permalink}`}
                                publish_date={value.publish_date}
                                thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.thumbnail?.file_url}`}
                                timestring={true}
                            />
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <h5 className="text-center">Events not found</h5>
                    </Col>
                )}
            </Row>
        </div>
        </>
    )
}

export default EventList;
