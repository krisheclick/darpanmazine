"use client";
import { Col, Row } from 'react-bootstrap';
import Styles from './style.module.css';
import { useEffect, useRef, useState } from 'react';
import PhotoBox from '@/components/common/box/PhotoBox';
import PhotoBoxSkeleton from '@/components/common/box/PhotoBoxSkeleton';
import NotFoundPage from '@/app/notFound';
import { usePhotosContext } from '@/context/photos_context';
import { useRouter, useSearchParams } from 'next/navigation';
interface SlugProps {
    slug?: string[];
    categoryCheck?: boolean;
}
interface PhotoItem {
    photo_heading?: string;
    photo_slug?: string;
    thumb_count?: number;
    photo_category?: {
        photo_category_name?: string;
        photo_category_slug?: string;
    }
    thumbnail?: {
        file_url?: string;
    }
}
const PhotosData = ({ slug = [], categoryCheck = false }: SlugProps) => {
    const [currentUrl, urlArray] = [...slug].reverse();
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<PhotoItem[] | null>(null);
    const { hasLoading, setLoading, setFeaturedData, setMostViewed } = usePhotosContext();
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    // pagination
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const photoListRef = useRef<HTMLDivElement | null>(null);
    const isNextClickRef = useRef(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 18;

    const fetchData = async (page: number) => {
        try {
            setLoading(true);
            const response = await fetch(`
                ${api_url}/${categoryCheck ? (`photos/category/${[...slug].join('/')}`) : 'photos/list'}?page=${page}&limit=${LIMIT}`,
                { cache: "no-store" });

            const { response_data, response_code } = await response.json();
            if (!response_code) {
                setNotFound(true);
                return;
            }
            setData(response_data?.photo);
            setTotalPages(response_data?.totalPages);
            setHasNextPage(page < response_data?.totalPages);
            setFeaturedData(response_data?.is_featured);
            setMostViewed(response_data?.most_viewed_photos);
        } catch (err: unknown) {
            console.log('Photos APi Response is somethig wrong', (err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    if (notFound) {
        <NotFoundPage />
    }

    const scrollToPostList = () => {
        if (!photoListRef.current) return;

        const y =
            photoListRef.current.getBoundingClientRect().top +
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
        <div className={Styles.photosList} ref={photoListRef}>
            <Row className='rowGap'>
                {hasLoading ? (
                    [...Array(12)].map((_, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <PhotoBoxSkeleton tag={true} />
                        </Col>
                    ))
                ) : data && data.length > 0 ? (
                    data.map((value, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <PhotoBox
                                className=' innerPhotos'
                                tag={value?.photo_category?.photo_category_name}
                                title={value?.photo_heading}
                                slug={`/photos/${value?.photo_category?.photo_category_slug}/${value?.photo_slug}`}
                                thumbnail={value?.thumbnail?.file_url}
                                thumb_count={value.thumb_count}
                            />
                        </Col>

                    ))
                ) : (
                    <Col xs={12}>
                        <h5>Posts not found</h5>
                    </Col>
                )}
            </Row>
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
        </div>
    )
}

export default PhotosData;
