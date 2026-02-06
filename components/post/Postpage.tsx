"use client";

import Sliderbanner from "../common/banner/Sliderbanner";
import PostView from "./PostView";
import PostList from "./PostList";
import Singlepage from "./Singlepage";
import NotFoundPage from "@/app/notFound";

import { usePostContext } from "@/context/post_context";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PageProps = {
    checkCategory?: boolean;
    slug: string[];
};

const PostPageComponent = ({ checkCategory = false, slug }: PageProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postListRef = useRef<HTMLDivElement | null>(null);
    const isNextClickRef = useRef(false);

    const page = Number(searchParams.get("page")) || 1;
    const [hasNextPage, setHasNextPage] = useState(true);
    const [notFound, setNotFoundPage] = useState(false);
    const { setLoading, setMainCategory, setAllPosts } = usePostContext();

    // -------- URL parsing --------
    const reversed = [...slug].reverse();
    const current_url = reversed[0];
    const urlArray = reversed.slice(1);

    const parentCategory = urlArray.length > 0 ? [...urlArray].reverse().join("/") : current_url;
    const postUrl = urlArray.length > 0 ? [...slug].join("/") : current_url;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // -------- Fetch data --------
    const fetchData = async (page: number) => {
        try {
            setLoading(true);

            // Category data
            const categoryRes = await fetch(
                `${API_URL}/category/${parentCategory}/`,
                { cache: "no-store" }
            );
            const { response_data: categoryData } =
                await categoryRes.json();

            setMainCategory(categoryData);

            // Posts data
            if (checkCategory) {
                const postRes = await fetch(
                    `${API_URL}/category/${postUrl}/posts?page=${page}&limit=9`,
                    { cache: "no-store" }
                );

                const { response_data, response_code } = await postRes.json();

                if (!response_code) {
                    setNotFoundPage(true);
                    return;
                }

                setAllPosts(response_data);

                setHasNextPage(response_data.length > 12);
            }
        } catch (err: unknown) {
            console.error(
                "API error:",
                (err as Error).message
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePrev = () => {
        if (page === 1) return;

        isNextClickRef.current = true;
        router.push(`?page=${page - 1}`, { scroll: false });
    };

    const handleNext = () => {
        isNextClickRef.current = true;
        router.push(`?page=${page + 1}`, { scroll: false });
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


    // Refetch when page changes
    useEffect(() => {
        fetchData(page);

        // scroll after render
        // setTimeout(() => {
        //     postListRef.current?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start",
        //     });
        // }, 300);

        if (isNextClickRef.current) {
            setTimeout(() => {
                scrollToPostList();
                isNextClickRef.current = false; // reset
            }, 300);
        }
    }, [page]);


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
            {/* 
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
            </div> */}
        </>
    );
};

export default PostPageComponent;
