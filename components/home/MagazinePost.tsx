"use client";
import { useEffect, useState } from "react";
import EventsBox from "../common/box/Box";
import { Col, Row } from "react-bootstrap";
import Styles from "./style.module.css";

type DataItem = {
    heading?: string;
    url?: string;
    author?: string;
    short_description?: string;
    image_dir?: string;
    thumb_image?: string | string[] | null;
    publish_date?: string;
}
const MagazinePost = () => {
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<DataItem[] | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/magazines`);
            const { response_data } = await response.json();
            setData(response_data?.data);
        } catch (err: unknown) {
            console.log('Trendings API fetch is something wrong: ', (err as Error).message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={Styles.magzineView}>
            <Row>
                <Col lg={4}>
                    <div className={Styles.magzineViewList}>
                        {data?.slice(1, 4)?.map((value, index) => {
                            return (
                                <div className="magazineBox" key={index}>
                                    <EventsBox
                                        tag="Events"
                                        title={value.heading}
                                        slug={value.url}
                                        author_name={value.author}
                                        publish_date={value.publish_date}
                                        thumbnail={`${process.env.NEXT_PUBLIC_IMAGE_URL}/library/uploads${value.image_dir} ${value.thumb_image}.jpg`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </Col>
                <Col lg={8}>
                    {data?.slice(0, 1)?.map((value, index) => {
                        return (
                            <div className="magazineBoxFirst" key={index}>
                                <EventsBox
                                    tag="Events"
                                    title={value.heading}
                                    slug={value.url}
                                    author_name={value.author}
                                    publish_date={value.publish_date}
                                    thumbnail={`${process.env.NEXT_PUBLIC_IMAGE_URL}/library/uploads${value.image_dir} ${value.thumb_image}.jpg`}
                                    errorImg={ `${process.env.NEXT_PUBLIC_ASSET_PREFIX || ''}assets/images/deleted/poster-woman.png` }
                                />
                            </div>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default MagazinePost
