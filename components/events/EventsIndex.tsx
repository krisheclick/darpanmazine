"use client";
import { use, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sliderbanner from "../common/banner/Sliderbanner";
import EventView from "./EventView";
import EventList from "./EventList";
import { useEventsContext } from "@/context/events_context";
import { usePostContext } from "@/context/post_context";
import SearchEvent from "./EventSearch";
import { Col, Row } from "react-bootstrap";
import BoxSkeleton from "../common/box/BoxSkeleton";
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
const EventsIndex = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const {hasLoading, setLoading, setMainCategory, setAllEvents } = useEventsContext();
    const { setLoading:postsetLoading,setReadMostArticle, setBanner} = usePostContext();

    const searchParams = useSearchParams();
    const router = useRouter();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const date = searchParams.get("date") || "";
    const from_date = searchParams.get("from_date") || "";
    const to_date = searchParams.get("to_date") || "";
    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);;
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page: number) => {
        try {
            // Fetch all events (paginated)
            const response = await fetch(`${API_URL}/event/list/?page=${page}&limit=9${date ? `&date=${date}` : ''}${from_date ? `&from_date=${from_date}` : ''}${to_date ? `&to_date=${to_date}` : ''}`, { cache: "no-store" });
            if (!response.ok) {
                throw new Error("API data is not ok. Please check & fixed...");
            }
            const { response_data, response_code } = await response.json();

            if (!response_code) {
                setAllEvents([]);
                setTotalPages(1);
                return;
            }
            if(page == 1) {
                setAllEvents(response_data?.events ?? []);     
                setBanner(
                    response_data?.is_featured?.map((item: BannerItem) => ({
                        ...item,
                        publishDate: item.publish_date,
                        'categoryview': {
                            'categoryName': item?.category?.category_name,
                            'slug': `events/${item?.category?.permalink}/`
                        }
                    }))
                );
                setReadMostArticle(response_data?.most_read_Events.map((value: {
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
                setTotalPages(response_data?.totalPages ?? 1);
                return;
            }

            setAllEvents((prev: any[]) => [...prev, ...(response_data?.events || [])]);
            setHasMore(page < response_data.totalPages);
            setLoadMoreData(false);
        } catch (err) {
            console.error((err as Error).message);
        } finally {
            setLoading(false);
            postsetLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            postsetLoading(true);

            // Fetch categories
            const catRes = await fetch(`${API_URL}/event/category/`, { cache: "no-store" });
            const { response_data: categories } = await catRes.json();
            // set a synthetic mainCategory to let EventView render category pills
            setMainCategory({
                category_name: "Events",
                permalink: "events",
                children: categories ?? [],
            });
        } catch (err) {
            console.error((err as Error).message);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    useEffect(() => {
        fetchData(page);
    }, [page, date, from_date, to_date]);

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


    const handleNext = () => {
        if (page < totalPages) router.push(`?page=${page + 1}`);
    };

    const handlePrev = () => {
        if (page > 1) router.push(`?page=${page - 1}`);
    };

    return (
        <>
            <Sliderbanner />
            <EventView />
            <SearchEvent />
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

            {/* {totalPages > 1 && (
                <div className="btn_center d-flex gap-3 justify-content-center">
                    <button className="rj-btn-next specialButton text-uppercase" onClick={handlePrev} disabled={page === 1}>Prev Page</button>
                    <button className="rj-btn-next specialButton text-uppercase" onClick={handleNext} disabled={page >= totalPages}>Next Page</button>
                </div>
            )} */}
        </>
    );
};

export default EventsIndex;
