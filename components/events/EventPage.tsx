"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sliderbanner from "../common/banner/Sliderbanner";
import EventView from "./EventView";
import EventList from "./EventList";
import EventSingle from "./EventSingle";
import NotFoundPage from "@/app/notFound";

import { useEventsContext } from "@/context/events_context";
import { usePostContext } from "@/context/post_context";
import SearchEvent from "./EventSearch";
import { Col, Row } from "react-bootstrap";
import BoxSkeleton from "../common/box/BoxSkeleton";

type PageProps = {
    checkCategory?: boolean;
    slug: string[];
};
interface BannerItem {
    author?: string;
    heading?: string;
    permalink?: string;
    short_description?: string;
    publish_date?: string;
    category?: {
        category_name?: string;
        permalink?: string;
        imageDir?: string;
    };
    thumbnail?: {
        file_url?: string;
    };
}

const EventPageComponent = ({ checkCategory = false, slug }: PageProps) => {
    const reversed = [...slug].reverse();
    const currentUrl = reversed[0];
    const urlArray = reversed.slice(1);

    const parentCategory =
        urlArray.length > 0 ? [...urlArray].reverse().join("/") : currentUrl;

    const postUrl =
        urlArray.length > 0 ? [...slug].join("/") : currentUrl;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    const searchParams = useSearchParams();
    const postListRef = useRef<HTMLDivElement | null>(null);
    const isNextClickRef = useRef(false);

    // const page = Number(searchParams.get("page")) || 1;
    const date = searchParams.get("date") || "";
    const from_date = searchParams.get("from_date") || "";
    const to_date = searchParams.get("to_date") || "";

    const [notFound, setNotFound] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);;
    const [totalPages, setTotalPages] = useState(1);

    const { hasLoading, setLoading, setMainCategory, setAllEvents} = useEventsContext();
    const { setLoading:postsetLoading, setReadMostArticle, setBanner} = usePostContext();

    const fetchEvents = async (page: number) => {
        try {
            // Using category-specific list endpoint pattern
            const response = await fetch(
                `${API_URL}/event/${postUrl}/list?page=${page}&limit=9${date ? `&date=${date}` : ''}${from_date ? `&from_date=${from_date}` : ''}${to_date ? `&to_date=${to_date}` : ''}`,
                { cache: "no-store" }
            );
            if (!response.ok) {
                throw new Error("API data is not ok. Please check & fixed...");
            }

            const { response_data, response_code } =
                await response.json();

            if (!response_code) {
                setNotFound(true);
                return;
            }
            if(page == 1) {
                setAllEvents(response_data?.events ?? []);
                setTotalPages(response_data.totalPages);
                setHasNextPage(page < response_data.totalPages);
                return;
            }
            setAllEvents((prev: any[]) => [...prev, ...(response_data?.events || [])]);
            setHasMore(page < response_data.totalPages);
            setLoadMoreData(false);
        } catch (error) {
            console.error("API error:", (error as Error).message);
        } finally {
            setLoading(false);
            postsetLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            postsetLoading(true);

            // Fetch category (event category details)
            const categoryRes = await fetch(
                `${API_URL}/event/category/${parentCategory}/`,
                { cache: "no-store" }
            );

            const { response_data: categoryData } = await categoryRes.json();
            if(!categoryData) {
                setNotFound(true);
                return;
            }

            if(!categoryData?.children || categoryData?.children?.length === 0 ) {
                const catRes = await fetch(`${API_URL}/event/category/`, { cache: "no-store" });
                const { response_data: categories } = await catRes.json();
                setMainCategory({
                    category_name: "Events",
                    permalink: "events",
                    children: categories ?? [],
                });
            }else{
                setMainCategory(categoryData);
            }
            setBanner(categoryData?.is_featured.map(
                (item: BannerItem) => ({
                    ...item,
                    publishDate: item.publish_date,
                    'categoryview': {
                        'categoryName': item?.category?.category_name,
                        'slug': `/events/${item?.category?.permalink}/`
                    }
                })
            ));
            // setReadMostArticle(categoryData?.most_read_Events);
            
            setReadMostArticle(categoryData?.most_read_Events.map((value: {
                    permalink: string,
                    category: {
                        permalink: string
                    },
                    thumbnail: string;
                }) => ({
                    ...value,
                    permalink: `/events/${value.category.permalink}/${value.permalink}`,
                    images: value.thumbnail,
                })) ?? []
            );
        } catch (err) {
            console.error((err as Error).message);
        }
    };

    useEffect(() => {
        if (checkCategory) {
            fetchCategories();
        }
    }, []);

    useEffect(() => {
        if (!checkCategory) return;

        fetchEvents(page);

        // if (isNextClickRef.current) {
        //     setTimeout(() => {
        //         scrollToPostList();
        //         isNextClickRef.current = false; // reset
        //     }, 150);
        // }
    }, [page, date, from_date, to_date, checkCategory]);

    const scrollToPostList = () => {
        if (!postListRef.current) return;

        const y =
            postListRef.current.getBoundingClientRect().top +
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

    if (!checkCategory) {
        return <EventSingle url={[...slug]} />;
    }

    if (notFound) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Sliderbanner />
            <EventView />
            <SearchEvent />

            <div ref={postListRef}>
                <EventList />
                {
                    loadMoreData && hasMore && (
                        <Row className="rowGap mt-4">
                        {
                            [...Array(6)].map((_, index) => (
                                <Col xl={4} sm={6} key={index}>
                                    <BoxSkeleton />
                                </Col>
                            ))
                        }
                        </Row>
                    )
                }
                {!hasMore && !loadMoreData ? '' : <div ref={loaderRef} />}
            </div>

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
        </>
    );
};

export default EventPageComponent;
