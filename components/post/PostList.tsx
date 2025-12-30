"use client";
import Styles from "./style.module.css";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import EventsBox from "../common/box/Box";

type PostItem = {
    title?: string;
    slug?: string;
    tag?: string;
    publishDate?: string;
    thumbnail_url?: string;
}

const api = {
    "response_data": {
        "posts": [
            {
                "title": "Team Bagry: Real Estate with Heart, Hustle, and Results ",
                "slug": "/news/team-bagry-real-estate-with-heart-hustle-and-results",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/1.png",
            },
            {
                "title": "Amy Sabharwal: Nurturing the Future with Quality Childcare",
                "slug": "/news/amy-sabharwal-nurturing-the-future-with-quality-childcare",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/2.png",
            },
            {
                "title": "Pioneering Oral Health Care in Surrey: Dr. Jeevan Gill",
                "slug": "/news/pioneering-oral-health-care-in-surrey-dr-jeevan-gill",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/3.png",
            },
            {
                "title": "Tamanna Punjabi Kapoora’s Serenade is A timeless ode to modern brides",
                "slug": "/news/tamanna-punjabi-kapooras-serenade-a-timeless-ode-to-modern-brides",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/tamanna_punjabi_kapoora’s.png",
            },
            {
                "title": "In retaliation for ‘Op Sindoor’, Pakistan halted newspapers to Indian  High Commision...",
                "slug": "/news/in-retaliation-for-op-sindoor-pakistan-halted-newspapers-to-indian-high-commission",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/op_sindoor_pakistan.jpg",
            },
            {
                "title": "BC Hydro's Site C dam is located on the Peace River, near St. John, British Columbia. ",
                "slug": "/news/bc-hydros-site-c-dam-located-on-the-peace-river-near-st-john-british-columbia",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/peace_river.png",
            },

        ]
    }
};
const PostList = () => {
    const [data, setData] = useState<PostItem[]>([]);
    const [hasLoading, setLasLoading] = useState(true);
    const fetchdata = async () => {
        try {
            // const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
            setData(api.response_data.posts);
        } catch (err: unknown) {
            console.log('Post API is something wrong: ', (err as Error).message);
        } finally {
            setLasLoading(false);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);
    return (
        <div className={Styles.postList}>
            <Row className="rowGap">
                {data.map((value, index) => (
                    <Col xl={4} sm={6} key={index}>
                        <EventsBox
                            tag={value.tag}
                            title={value.title}
                            slug={value.slug}
                            publish_date={value.publishDate}
                            thumbnail={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/${value.thumbnail_url}`}
                            timestring={true}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default PostList
