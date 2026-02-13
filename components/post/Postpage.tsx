"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PostView from "./PostView";
import PostList from "./PostList";
import Singlepage from "./Singlepage";
import NotFoundPage from "@/app/notFound";

import { usePostContext } from "@/context/post_context";
import Sliderbanner from "@/components/common/banner/Sliderbanner";

type PageProps = {
    checkCategory?: boolean;
    slug: string[];
};

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

    const page = Number(searchParams.get("page")) || 1;

    const [notFound, setNotFound] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const { setLoading, setMainCategory, setAllPosts, setReadMostArticle, setBanner} = usePostContext();

    const fetchPosts = async (page: number) => {
        try {
            setLoading(true);

            // Fetch category
            const categoryRes = await fetch(
                `${API_URL}/category/${parentCategory}/`,
                { cache: "no-store" }
            );

            const { response_data: categoryData } =
                await categoryRes.json();

            setMainCategory(categoryData);
            setBanner(categoryData?.is_featured);
            setReadMostArticle(categoryData?.most_read_articles);

            // Fetch posts (only for category pages)
            if (checkCategory) {
                const postRes = await fetch(
                    `${API_URL}/category/${postUrl}/posts?page=${page}&limit=9`,
                    { cache: "no-store" }
                );

                const { response_data, response_code } =
                    await postRes.json();

                if (!response_code) {
                    setNotFound(true);
                    return;
                }

                setAllPosts(response_data?.data ?? []);
                setTotalPages(response_data.totalPages);
                setHasNextPage(page < response_data.totalPages);
            }
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

        if (isNextClickRef.current) {
            setTimeout(() => {
                scrollToPostList();
                isNextClickRef.current = false; // reset
            }, 150);
        }
    }, [page, checkCategory]);


    if (!checkCategory) {
        return <Singlepage url={[...slug]} />;
    }

    if (notFound) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Sliderbanner />
            <PostView />

            <div ref={postListRef}>
                <PostList />
            </div>

            {totalPages > 1 && (
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
            )}
        </>
    );
};

export default PostPageComponent;
