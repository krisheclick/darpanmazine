"use client";
import Styles from '../post/style.module.css';
import ImageFunction from '@/utlis/ImageFunction';
import { useEffect, useState } from 'react';
import { useEventsContext } from '@/context/events_context';
import NotFoundPage from '@/app/notFound';
import Share from '../common/share/Share';
import { usePostContext } from '@/context/post_context';

type PageProps = {
    url?: string[];
}
type PageData = {
    heading?: string;
    author?: string;
    description?: string;
    publish_date?: string;
    permalink?: string;
    category?: {
        category_name?: string;
        permalink?: string;
    }
    images?: {
        file_url?: string;
    }[];
}
interface MostReadArticle {
    heading?: string;
    permalink?: string;
    category?: {
        category_name?: string;
        permalink?: string;
        imageDir?: string;
    };
    images?: [{
        file_url?: string;
    }];
    publish_date?: string;
}

const EventSingle = ({ url = [] }: PageProps) => {
    const [notFound, setNotFoundPage] = useState(false);
    const [data, setData] = useState<PageData | null>(null);
    const { setLoading, hasLoading, setMainCategory } = useEventsContext();
    const { setLoading:postsetLoading, setReadMostArticle, setArticle, setOtherSlider, setPostCategory} = usePostContext();

    useEffect(() => {
        return () => {};
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/magazines/${url.at(-1)}`);
            const { response_code, response_data } = await response.json();
            if (!response_code) {
                setNotFoundPage(true);
                return;
            }
            setData(response_data);
            setReadMostArticle(response_data?.mostmagazine.map(
                (item: MostReadArticle) => ({
                    ...item,
                    'images': item?.images?.[0],
                    'publishDate': item?.publish_date,
                    'categoryview': {
                        'categoryName': item?.category?.category_name,
                        'permalink': `/magazine/${item?.category?.permalink}/`
                    }
                })
            ));
            setPostCategory({
                'categoryName': response_data?.category?.category_name,
                'slug': `/magazine/${response_data?.category?.permalink}/`
            });
            setArticle(response_data?.latest_articles.map(
                (item: MostReadArticle) => ({
                    ...item,
                    'images': item?.images?.[0],
                    'publishDate': item?.publish_date,
                })
            ));
            setOtherSlider(true);
            setMainCategory(response_data?.categoryview ?? null);
        } catch (err: unknown) {
            console.log('Event API error: ', (err as Error).message);
        } finally {
            postsetLoading(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (notFound) {
        return <NotFoundPage />
    }

    const poster = data?.images?.[0]?.file_url;
    const publishDate = data?.publish_date;
    const dateObj = new Date(publishDate ?? '');
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
    }) + dateObj.getFullYear();

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        !hasLoading && (
            <div className={Styles.single_page}>
                <div className={Styles.topcontent}>
                    <div className={Styles.catName}>{data?.category?.category_name}</div>
                    <h1 className={Styles.pageTitle}>{data?.heading}</h1>
                    <div className={Styles.tagWrap}>
                        <span>by {data?.author},</span>
                        <span>{formattedDate}, </span>
                        <time dateTime={formattedTime}>{formattedTime}</time>
                    </div>
                </div>
                <ImageFunction
                    className={Styles.poster}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    alt={data?.heading || "Event Poster"}
                    staticImage={false}
                />
                <div className={Styles.single_content}>
                    <Share title={data?.heading}/>
                    <div className={`rj_editor_text ${Styles.rj_editor_text}`}
                        dangerouslySetInnerHTML={{ __html: data?.description || '' }}
                    />
                </div>
            </div>
        )
    )
}

export default EventSingle;
