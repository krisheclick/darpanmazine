"use client";
import Styles from "./style.module.css";
import { Col, Row } from "react-bootstrap";
import EventsBox from "../common/box/Box";
import BoxSkeleton from "../common/box/BoxSkeleton";
import { usePostContext } from "@/context/post_context";

const PostList = () => {
    const {hasLoading, allPosts} = usePostContext();
    return (
        <div className={Styles.postList}>
            <Row className="rowGap">
                {!hasLoading && allPosts ? (
                    allPosts.map((value, index) => (
                    <Col xl={4} sm={6} key={index}>
                        <EventsBox
                            tag={value.categoryview?.categoryName}
                            title={value.heading}
                            slug={`${value.categoryview?.slug}${value.permalink}`}
                            publish_date={value.publishDate}
                            thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.thumbnail?.file_url}`}
                            timestring={true}
                        />
                    </Col>
                ))) : (
                    [...Array(6)].map((_, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <BoxSkeleton />
                        </Col>
                    ))
                )}
            </Row>
        </div>
    )
}

export default PostList
