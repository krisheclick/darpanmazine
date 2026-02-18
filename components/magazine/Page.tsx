"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sliderbanner from "../common/banner/Sliderbanner";
import MagazineView from "./View";
import MagzineList from "./List";
import NotFoundPage from "@/app/notFound";

import { useEventsContext } from "@/context/events_context";
import { usePostContext } from "@/context/post_context";
import MagazineSingle from "./details";

type PageProps = {
    checkCategory?: boolean;
    slug: string[];
};
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

const MagazinePageComponent = ({ checkCategory = false, slug }: PageProps) => {
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

    const { setLoading, setMainCategory, setAllEvents} = useEventsContext();
    const { setLoading:postsetLoading, setReadMostArticle, setBanner} = usePostContext();

    const fetchEvents = async (page: number) => {
        try {
            setLoading(true);
            postsetLoading(true);

            // Fetch category (event category details)
            const categoryRes = await fetch(
                `${API_URL}/magazines/category/${parentCategory}/`,
                { cache: "no-store" }
            );

            const { response_data: categoryData } = await categoryRes.json();
            if(!categoryData) {
                setNotFound(true);
                return;
            }

            if(!categoryData?.children || categoryData?.children?.length === 0 ) {
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
            }else{
                setMainCategory(categoryData);
            }
            setBanner(
                categoryData?.is_featured?.map((item: BannerItem) => ({
                    ...item,
                    publishDate: item.publish_date,
                    'permalink': `/magazine${item?.slug}`,
                    'categoryview': {
                        'categoryName': item?.category?.category_name,
                        'slug': ``
                    }
                }))
            );
            
            setReadMostArticle(categoryData.most_read_magazines.map(
                (item: MostReadArticle) => ({
                    ...item,
                    'images': item?.thumbnail,
                    'permalink': `/magazine${item?.slug}`,
                    'publishDate': item?.publish_date,
                    'categoryview': {
                        'categoryName': item?.category?.category_name,
                        'slug': ``
                        // 'permalink': `/magazine/${item?.category?.permalink}/`
                    }
                })
            ));

            // Fetch events (only for category pages)
            if (checkCategory) {
                // Using category-specific list endpoint pattern
                const eventRes = await fetch(
                    `${API_URL}/magazines/category/${postUrl}/magazines?page=${page}&limit=9`,
                    { cache: "no-store" }
                );

                const { response_data, response_code } =
                    await eventRes.json();

                if (!response_code) {
                    setNotFound(true);
                    return;
                }

                setAllEvents(response_data?.magazines.map((item:{category_name:string,slug:string})=>({
                    ...item,
                    permalink:item.slug
                })));
                setTotalPages(response_data.totalPages);
                setHasNextPage(page < response_data.totalPages);
            }
        } catch (error) {
            console.error("API error:", (error as Error).message);
        } finally {
            setLoading(false);
            postsetLoading(false);
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

        fetchEvents(page);

        if (isNextClickRef.current) {
            setTimeout(() => {
                scrollToPostList();
                isNextClickRef.current = false; // reset
            }, 150);
        }
    }, [page, checkCategory]);


    if (!checkCategory) {
        return <MagazineSingle url={[...slug]} />;
    }

    if (notFound) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Sliderbanner />
            <MagazineView />

            <div ref={postListRef}>
                <MagzineList />
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

export default MagazinePageComponent;
