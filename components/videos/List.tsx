"use client";
import { Col, Row } from "react-bootstrap";
import Styles from "./style.module.css";
import VideosliderBox from "./VideosliderBox";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NotFoundPage from "@/app/notFound";
import { useVideosContext } from "@/context/video_context";
import VideoSkeleton from "./videoSkeleton";
import BoxSkeleton from "../common/box/BoxSkeleton";

type SlugProps = {
    slug?: string[];
    categoryCheck?: boolean;
}
interface VideoItem {
    source?: string;
    author?: string;
    heading?: string;
    permalink?: string;
    short_description?: string;
    publish_date?: string;
    category?: {
        category_name?: string;
        permalink?: string;
    }
    thumbnail?: {
        file_url?: string;
    }
}
const VideoList = ({ slug = [], categoryCheck = false }: SlugProps) => {
    const [currentUrl] = [...slug].reverse();
    const urlArray = [...slug].join('/');

    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<VideoItem[] | null>(null);
    const { hasLoading, setLoading, setFeaturedVideo } = useVideosContext();
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    // pagination
    const router = useRouter();
    const searchParams = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);;
    const [totalPages, setTotalPages] = useState(1);
    const videoListRef = useRef<HTMLDivElement | null>(null);
    const isNextClickRef = useRef(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const LIMIT = 21;

    const fetchData = async (page: number) => {
        try {
            if(page === 1) {
                setLoading(true);
            }
            const response = await fetch(`
                ${api_url}/${categoryCheck ? (`video/category/${urlArray}`) : 'videos'}?page=${page}&limit=${LIMIT}`,
                { cache: "no-store" });

            const { response_data, response_code } = await response.json();

            if (!response_code) {
                setNotFound(true);
                return;
            }
            if(page === 1) {
                setData(response_data?.videos);
                setTotalPages(response_data?.totalPages);
                setHasNextPage(page < response_data?.totalPages);
                setFeaturedVideo(response_data?.is_featured);
                return;
            }
            setData((prev) => prev ? [...prev, ...(response_data?.videos ?? [])] : response_data?.videos ?? []);
            setHasMore(page < response_data?.totalPages);
            setLoadMoreData(false);
        } catch (err: unknown) {
            console.log('Videos APi Response is somethig wrong', (err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loadMoreData) return;
        if (!hasMore) return;
        if (observer.current) observer.current.disconnect();
        // console.log('observer-------',observer)
        observer.current = new window.IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setLoadMoreData(true);
                setPage(prev => prev + 1);
            }
        });
        if (loaderRef.current) observer.current.observe(loaderRef.current);
    }, [hasLoading, hasMore]);

    if (notFound) {
        <NotFoundPage />
    }

    const scrollToPostList = () => {
        if (!videoListRef.current) return;

        const y =
            videoListRef.current.getBoundingClientRect().top +
            window.pageYOffset - 120;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    const handleNext = () => {
        if (hasNextPage) {
            isNextClickRef.current = true;
            router.push(`?page=${page + 1}`);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            isNextClickRef.current = true;
            router.push(`?page=${page - 1}`);
        }
    };

    useEffect(() => {
        fetchData(page);

        if (isNextClickRef.current) {
            setTimeout(() => {
                scrollToPostList();
                isNextClickRef.current = false; // reset
            }, 150);
        }
    }, [page]);
    return (
        <div className={Styles.videoList} ref={videoListRef}>
            <Row className="rowGap2">
                {hasLoading ? (
                    [...Array(21)].map((_, index) => (
                        <Col lg={4} sm={6} key={index}>
                            <VideoSkeleton />
                        </Col>
                    ))
                ) : (
                    data && (data?.length > 0) ? (
                        data?.map((value, index) => (
                            <Col lg={4} sm={6} key={index}>
                                <VideosliderBox
                                    title={value?.heading}
                                    url={`/videos/${value.category?.permalink}/${value?.permalink}`}
                                    poster={value?.thumbnail?.file_url}
                                    className="innerVideos"
                                />
                            </Col>
                        ))
                    ) : (
                        <Col>Videos Not Found</Col>
                    )
                )}
            </Row>
            {
                loadMoreData && hasMore && (
                    <Row className="rowGap mt-4">
                    {
                        [...Array(21)].map((_, index) => (
                            <Col lg={4} sm={6} key={index}>
                                <VideoSkeleton />
                            </Col>
                        ))
                    }
                    </Row>
                )
            }
            {!hasMore && !loadMoreData ? '' : <div ref={loaderRef} />}
            {/* {totalPages > 1 && (
                <div className="btn_center d-flex gap-3 justify-content-center">
                    <button
                        className="rj-btn-next specialButton text-uppercase"
                        onClick={handlePrev}
                        disabled={page === 1}
                    >
                        Prev Page
                    </button>

                    <button
                        className="rj-btn-next specialButton text-uppercase"
                        onClick={handleNext}
                        disabled={!hasNextPage}
                    >
                        Next Page
                    </button>
                </div>
            )} */}
        </div>
    )
}

export default VideoList;