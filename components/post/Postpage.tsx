"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PostView from "./PostView";
import PostList from "./PostList";
import Singlepage from "./Singlepage";
import NotFoundPage from "@/app/notFound";

import { usePostContext } from "@/context/post_context";
import Sliderbanner from "@/components/common/banner/Sliderbanner";

import Styles from "./style.module.css";
import { Col, Row } from "react-bootstrap";
import BoxSkeleton from "../common/box/BoxSkeleton";

type PageProps = {
    checkCategory?: boolean;
    slug: string[];
};

interface Postdata {
    heading?: string;
    permalink?: string;
    shortDescription?: string;
    publishDate?: string;
    categoryview?: {
        categoryName?: string;
        slug?: string;
    }
    thumbnail?: {
        file_name?: string;
        file_url?: string;
    }
}
const PostPageComponent = ({ checkCategory = false, slug }: PageProps) => {
    // -------- URL parsing --------
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

    const [notFound, setNotFound] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const { hasLoading, setLoading, setMainCategory, setAllPosts, setReadMostArticle, setBanner} = usePostContext();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    const fetchPosts = async (page: number) => {
        try {
            if(page == 1) {
                setLoading(true);
            }

            let API = `${API_URL}/category/${[...slug].join('/')}/?limit=9&page=${page}`;
            if(page > 1) {
                API = `${API_URL}/category/${[...slug].join('/')}/posts?limit=9&page=${page}`;
            }

            const response = await fetch(API);
            if (!response.ok) {
                throw new Error("API data is not ok. Please check & fixed...");
            }

            const data = await response.json();
            if (data.response_code === false) {
                setNotFound(true);
                return;
            }
            const responseData = data.response_data;
            if(page == 1) {
                setMainCategory(responseData);
                setAllPosts(responseData.posts||[]);
                setBanner(responseData?.is_featured.map((value: {publish_date: string}) => ({
                    ...value,
                    publishDate: value.publish_date
                })) ?? []);
                setReadMostArticle(responseData?.most_read_articles.map((value: {permalink: string; thumbnail: {file_url: string}; categoryview: {slug: string}}) => ({
                    ...value,
                    images: value?.thumbnail,
                    permalink: `${value.categoryview.slug}${value.permalink}`
                })));
                setTotalPages(responseData.totalPages);                
                // setImageDir(responseData.imageDir);
                return;
            }
            setAllPosts((prev: Postdata[]) => [...prev, ...(responseData.data || [])]);
            setHasMore(page < responseData.totalPages);
            setLoadMoreData(false);



            // setAllPosts(prev => [...prev, ...(responseData.posts || responseData || [])]);
            // setHasMore((responseData.posts || responseData || []).length > 0);

            // // Fetch category
            // const categoryRes = await fetch(`${API_URL}/category/${parentCategory}/`,{ cache: "no-store" });

            // const { response_data: categoryData } = await categoryRes.json();

            // setMainCategory(categoryData);
            // setBanner(categoryData?.is_featured.map((value: {publish_date: string}) => ({
            //     ...value,
            //     publishDate: value.publish_date
            // })) ?? []);
            // setReadMostArticle(categoryData?.most_read_articles.map((value: {permalink: string; categoryview: {slug: string}}) => ({
            //     ...value,
            //     permalink: `${value.categoryview.slug}${value.permalink}`
            // })));

            // // Fetch posts (only for category pages)
            // if (checkCategory) {
            //     const postRes = await fetch(
            //         `${API_URL}/category/${postUrl}/posts?page=${page}&limit=9`,
            //         { cache: "no-store" }
            //     );

            //     const { response_data, response_code } =
            //         await postRes.json();

            //     if (!response_code) {
            //         setNotFound(true);
            //         return;
            //     }

            //     setAllPosts(response_data?.data ?? []);
            //     setTotalPages(response_data.totalPages);
            //     setHasNextPage(page < response_data.totalPages);
            // }
        } catch (error) {
            console.error("API error:", (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

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
        if (!checkCategory) return;

        fetchPosts(page);

        // if (isNextClickRef.current) {
        //     setTimeout(() => {
        //         scrollToPostList();
        //         isNextClickRef.current = false; // reset
        //     }, 150);
        // }
    }, [page, checkCategory]);

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
        return <Singlepage url={[...slug]} />;
    }

    if (notFound) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Sliderbanner />
            <PostView parentCategory={parentCategory}/>

            <div ref={postListRef}>
                <PostList />
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

export default PostPageComponent;
