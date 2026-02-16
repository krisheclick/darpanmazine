"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sliderbanner from "../common/banner/Sliderbanner";
import MagazineView from "./View";
import MagazineList from "./List";
import { useEventsContext } from "@/context/events_context";
import { usePostContext } from "@/context/post_context";
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
    permalink?: string;
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
    const { setLoading, setMainCategory, setAllEvents } = useEventsContext();
    const { setLoading:postsetLoading,setReadMostArticle, setBanner} = usePostContext();

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get("page")) || 1;

    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page: number) => {
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

            // Fetch all events (paginated)
            const listRes = await fetch(`${API_URL}/magazines?page=${page}&limit=9`, { cache: "no-store" });
            const { response_data, response_code } = await listRes.json();

            if (!response_code) {
                setAllEvents([]);
                setTotalPages(1);
                return;
            }

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
                    'publish_date': item?.publish_date,
                    'categoryview': {
                        'categoryName': item?.category?.category_name,
                        'permalink': `/magazine/${item?.category?.permalink}/`
                    }
                })
            ));
            setTotalPages(response_data?.totalPages ?? 1);
        } catch (err) {
            console.error((err as Error).message);
        } finally {
            setLoading(false);
            postsetLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

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

            {totalPages > 1 && (
                <div className="btn_center d-flex gap-3 justify-content-center">
                    <button className="rj-btn-next specialButton text-uppercase" onClick={handlePrev} disabled={page === 1}>Prev Page</button>
                    <button className="rj-btn-next specialButton text-uppercase" onClick={handleNext} disabled={page >= totalPages}>Next Page</button>
                </div>
            )}
        </>
    );
};

export default MagazineIndex;
