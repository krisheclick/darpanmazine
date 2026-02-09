"use client";
import { Col, Row } from 'react-bootstrap';
import Styles from './style.module.css';
import { useEffect, useState } from 'react';
import PhotoBox from '@/components/common/box/PhotoBox';
import PhotoBoxSkeleton from '@/components/common/box/PhotoBoxSkeleton';
import NotFoundPage from '@/app/notFound';
interface SlugProps {
    slug?: string[];
    categoryCheck?: boolean;
}
interface PhotoItem {
    photo_heading?: string;
    photo_slug?: string;
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
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<PhotoItem[] | null>(null);
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`
                ${api_url}/${categoryCheck ? (`photos/category/${[...slug].join('/')}`) : 'photos/list'}`,
                { cache: "no-store" });

            const { response_data, response_code} = await response.json();
            if (!response_code) {
                setNotFound(true);
                return;
            }
            setData(response_data?.photo);
        } catch (err: unknown) {
            console.log('Photos APi Response is somethig wrong', (err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(notFound){
        <NotFoundPage />
    }

    return (
        <div className={Styles.photosList}>
            <Row>
                {hasLoading ? (
                    [...Array(12)].map((_, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <PhotoBoxSkeleton tag ={true} />
                        </Col>
                    ))
                ) : data && data.length > 0 ? (
                    data.map((value, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <PhotoBox
                                tag={value?.photo_category?.photo_category_name}
                                title={value?.photo_heading}
                                slug={`/photos/${value?.photo_category?.photo_category_slug}/${value?.photo_slug}`}
                                thumbnail={value?.thumbnail?.file_url}
                            />
                        </Col>

                    ))
                ) : (
                    <Col xs={12}>
                        <h5>Posts not found</h5>
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default PhotosData;
