"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { usePostContext } from '@/context/post_context';
import { useEffect, useRef, useState } from 'react';
import { useBusinessContext } from '@/context/business_context';
import BusinessList from './BusinessList';
import Sliderbanner from '../common/banner/Sliderbanner';
import NotFoundPage from '@/app/notFound';
import BusinessCategory from './BusinessCategory';

interface dataCheck {
    slug?: string[];
    categoryCheck?: boolean;
}

const BusinessIndex = ({ slug = [], categoryCheck = false }: dataCheck) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [currentUrl, ...slugArray] = [...slug].reverse();

    const { setLoading, setBanner, setReadMostArticle} = usePostContext();
    const { setLoading: postLoading, setMainCategory, setBusinessData } = useBusinessContext();

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [hasNextPage, setHasNextPage] = useState(false);
    const [totalPages, setTotalPage] = useState(1);
    const [notFoundPage, setNotFoundPage] = useState(false);

    // Refarance
    const postListRef = useRef<HTMLDivElement | null>(null);
    const isNextClickRef = useRef(false);
    const limit = 9;

    const fetchData = async (page: number) => {
        try {
            setLoading(true);
            postLoading(true);
            const catRes = await fetch(
                `${API_URL}/business/category/`,
                { cache: "no-store" }
            );
            const { response_data: catData } = await catRes.json();
            setMainCategory({
                category_name: "Business",
                permalink: "business",
                children: catData?.map((value: { business_category_name: string, business_category_slug: string }) => ({
                    ...value,
                    category_name: value.business_category_name,
                    permalink: value.business_category_slug
                }))
            });

            // Post
            const response = await fetch(

                `${API_URL}/business/${categoryCheck ? `category/${currentUrl}` : 'list'}?page=${page}&limit=${limit}`,
                { cache: "no-store" }
            );
            const { response_data, response_code } = await response.json();
            if (!response_code) {
                setNotFoundPage(true);
                return;
            }
            setBusinessData(response_data?.business ?? []);
            setTotalPage(response_data?.totalPages)
            setHasNextPage(page < response_data?.totalPages);

            // Banner
            setBanner(
                response_data?.is_featured?.map(
                    (value: {
                        business_heading: string, 
                        business_slug: string;
                        publish_date?: string;
                        business_category: { business_category_slug: string };
                    }

                ) => ({
                    ...value,
                    heading: value.business_heading,
                    permalink: `/${value.business_slug}`,
                    categoryview: {
                        slug: `${value.business_category.business_category_slug}`,
                    },
                    publishDate: value.publish_date,
                })) || []
            );

            // Most Article
            setReadMostArticle(
                response_data?.most_viewed_business.map((value: {
                    business_heading: string;
                    business_slug: string;
                    thumbnail: string;
                    business_category: { business_category_slug: string };
                }) => ({
                    ...value,
                    heading: value.business_heading,
                    permalink: `/business/${value.business_category.business_category_slug}/${value.business_slug}`,
                    images: value.thumbnail,
                })) ?? []
            );


        } catch (err: unknown) {
            console.log('Business Data is something wrong: ', (err as Error).message)
        } finally {
            setLoading(false);
            postLoading(false);
        }
    }

    const scrollTopPost = () => {
        if (!postListRef.current) return;

        const y = postListRef.current.getBoundingClientRect().top + window.pageYOffset - 120;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    }

    const handleNext = () => {
        if (hasNextPage) {
            isNextClickRef.current = true;
            router.push(`?page=${page + 1}`);
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            isNextClickRef.current = false;
            router.push(`?page=${page - 1}`);
        }
    }

    useEffect(() => {
        fetchData(page);

        if (isNextClickRef.current) {
            setTimeout(() => {
                scrollTopPost();
                isNextClickRef.current = false;
            }, 150)
        }
    }, [page]);

    if (notFoundPage) {
        return <NotFoundPage />
    }
    
    return (
        <>
            <Sliderbanner />
            <BusinessCategory />
            <div ref={postListRef}>
                <BusinessList />
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
    )
}

export default BusinessIndex;
