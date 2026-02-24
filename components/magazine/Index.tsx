"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sliderbanner from "../common/banner/Sliderbanner";
import MagazineView from "./View";
import MagazineList from "./List";
import { useEventsContext } from "@/context/events_context";
import { usePostContext } from "@/context/post_context";
import { Col, Row } from "react-bootstrap";
import BoxSkeleton from "../common/box/BoxSkeleton";
interface BannerItem {
    author?: string;
    heading?: string;
    slug?: string;
    short_description?: string;
    publish_date?: string;
    category?: {
        category_name?: string;
        slug?: string;
        imageDir?: string;
    };
    thumbnail?: {
        file_url?: string;
    };
}
interface MostReadArticle {
    heading?: string;
    slug?: string;
    category?: {
        category_name?: string;
        permalink?: string;
        imageDir?: string;
    };
    thumbnail?: {
        file_url?: string;
    };
    publish_date?: string;
}
const MagazineIndex = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { hasLoading, setLoading, setMainCategory, setAllEvents } = useEventsContext();
    const { setLoading:postsetLoading,setReadMostArticle, setBanner} = usePostContext();

    const searchParams = useSearchParams();
    const router = useRouter();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);;
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page: number) => {
        try {
            // Fetch all events (paginated)
            const listRes = await fetch(`${API_URL}/magazines?page=${page}&limit=9`, { cache: "no-store" });
            const { response_data, response_code } = await listRes.json();

            if (!response_code) {
                setAllEvents([]);
                setTotalPages(1);
                return;
            }
            if(page == 1) {
                setAllEvents(response_data?.magazines.map((item:{category_name:string,slug:string})=>({
                    ...item,
                    permalink:item.slug
                })));     
                setBanner(
                    response_data?.is_featured?.map((item: BannerItem) => ({
                        ...item,
                        publishDate: item.publish_date,
                        'permalink': `magazine${item?.slug}`,
                        'categoryview': {
                            'categoryName': item?.category?.category_name,
                            'slug': ``
                        }
                    }))
                );
                setReadMostArticle(response_data.most_read_magazines.map(
                    (item: MostReadArticle) => ({
                        ...item,
                        'images': item?.thumbnail,
                        'permalink': `/magazine${item?.slug}`,
                        'publish_date': item?.publish_date,
                        'categoryview': {
                            'categoryName': item?.category?.category_name,
                            'permalink': `/magazine/${item?.category?.permalink}/`
                        }
                    })
                ));
                setTotalPages(response_data?.totalPages ?? 1);
                return;
            }

            setAllEvents((prev)=> [...prev, ...response_data?.magazines.map((item:{category_name:string,slug:string})=>({
                    ...item,
                    permalink:item.slug
                }))]);
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
            const catRes = await fetch(`${API_URL}/magazines/category/`, { cache: "no-store" });
            const { response_data: categories } = await catRes.json();
            
            setMainCategory({
                category_name: "Magazine",
                permalink: "magazine",
                children: categories.map((item:{category_name:string,slug:string})=>({
                    ...item,
                    permalink:item.slug
                })),
            });
        } catch (err) {
            console.error((err as Error).message);
        }
    }
    useEffect(() => {
        fetchCategories();
    },[]);
    useEffect(() => {
        fetchData(page);
    }, [page]);

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
            <MagazineView />

            <MagazineList />
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

export default MagazineIndex;
