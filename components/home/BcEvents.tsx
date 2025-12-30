"use client";
// import { useState } from "react";
import {Col, Row} from "react-bootstrap";
import EventsBox from "../common/box/Box";
const BcEventsList = () => {
    const events = {
        "status": "success",
        "response_data": [
            {
                "tag": "Events",
                "title": "Tamanna Punjabi Kapoor’s Serenade is a timeless ode",
                "slug": "/#",
                "thumbnail_dir": "deleted/",
                "thumbnail": "tamanna_punjabi_kapoora’s.png",
                "author_name": "Darpan Desk",
                "publish_date": "2025-05-26T14:28:01.000Z"
            },
            {
                "tag": "Events",
                "title": "In retaliation for Op Sindoor, Pakistan halted newspapers",
                "slug": "/#",
                "thumbnail_dir": "deleted/",
                "thumbnail": "op_sindoor_pakistan.jpg",
                "author_name": "Joanna Wellick",
                "publish_date": "2025-01-18T09:15:00.000Z"
            },
            {
                "tag": "Events",
                "title": "BC Hydro's Site C dam is located on the Peace River, near St.",
                "slug": "/#",
                "thumbnail_dir": "deleted/",
                "thumbnail": "peace_river.png",
                "author_name": "Joanna Wellick",
                "publish_date": "2025-01-18T09:15:00.000Z"
            }
        ]
    }

    // type DataItem = {
    //     tag?: string;
    //     title?: string;
    //     thumbnail?: string;
    //     author_name?: string;
    //     publish_date?: string;
    // }

    // const [hasLoading, setLoading] = useState(true);
    // const [data, setData] = useState<DataItem[] | null>(null);

    // const fetchData = async() => {
    //     try{
    //         const response = await fetch(events);
    //         const {response_data} = (await response).json();
    //         setData(response_data);
    //     }catch(err: unknown){
    //         console.log('Events Data is something wrong: ', (err as Error).message);
    //     }finally{
    //         setLoading(false)
    //     }
    // }

    return (
        <Row className="gx-3">
            {events.response_data.map((value, index) => (
                <Col lg={4} key={index}>
                    <EventsBox
                        tag={value.tag}
                        title={value.title}
                        slug={value.slug}
                        author_name={value.author_name}
                        publish_date={value.publish_date}
                        thumbnail={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}${value.thumbnail_dir}${value.thumbnail}`}
                    />
                </Col>
            ))}
        </Row>
    )
}

export default BcEventsList
