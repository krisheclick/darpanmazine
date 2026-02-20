"use client";
import Styles from '../post/style.module.css';
import ImageFunction from '@/utlis/ImageFunction';
import { useEffect, useState } from 'react';
import { useEventsContext } from '@/context/events_context';
import NotFoundPage from '@/app/notFound';
import Share from '../common/share/Share';
import { usePostContext } from '@/context/post_context';
import Script from "next/script";
import { usePathname } from 'next/navigation';
import DangerHTML from '../common/DangerHTML';

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
    address: string;
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
    const { setLoading: postsetLoading, setReadMostArticle, setArticle, setOtherSlider, setPostCategory } = usePostContext();
    const pathname = usePathname();

    useEffect(() => {
        return () => { };
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${url.at(-1)}`);
            const { response_code, response_data } = await response.json();
            if (!response_code) {
                setNotFoundPage(true);
                return;
            }
            setData(response_data);
            setReadMostArticle(response_data?.mostarticles.map(
                (item: MostReadArticle) => ({
                    ...item,
                    'images': item?.images?.[0],
                    'publishDate': item?.publish_date,
                    'categoryview': {
                        'categoryName': item?.category?.category_name,
                        'permalink': `/events/${item?.category?.permalink}/`
                    }
                })
            ));
            setPostCategory({
                'categoryName': response_data?.category?.category_name,
                'slug': `/events/${response_data?.category?.permalink}/`
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
    function MapEmbed(address: string) {
        const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=18&output=embed`;

        return (
            <iframe
                width="100%"
                height="600"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={src}
            ></iframe>
        );
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (notFound) {
        return <NotFoundPage />
    }
    // window.instgrm?.Embeds.process();
    // if (window.twttr?.widgets) {
    //     window.twttr.widgets.load();
    // }
    // useEffect(() => {
    //     if (!data) return;
    //     window.instgrm?.Embeds.process();
    //     if (window.twttr?.widgets) {
    //         window.twttr.widgets.load();
    //     }
    //     const timer = setTimeout(() => {
    //         if (window.twttr?.widgets) {
    //             window.twttr.widgets.load();
    //         }
    //         window.instgrm?.Embeds.process();
    //     }, 500); // wait for DOM paint

    //     return () => clearTimeout(timer);
    // }, [data, pathname]);
    // const handleSameClick = () => {
    //     setTimeout(() => {
    //         window.twttr?.widgets.load();
    //     }, 100);
    // };
    // handleSameClick()
    // useEffect(() => {
    //     alert('Pathname changed, reloading Twitter widgets and Instagram embeds');
    //     const tweets = document.querySelectorAll(".twitter-tweet");
    //     tweets.forEach((tweet) => {
    //         tweet.innerHTML = tweet.innerHTML; // reset
    //     });
    //     const interval = setInterval(() => {
    //         if (window.twttr?.widgets) {
    //             window.twttr.widgets.load();
    //             clearInterval(interval);
    //         }
    //     }, 300);

    //     return () => clearInterval(interval);
    // }, [pathname]);

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
                    <Share title={data?.heading} />
                    <DangerHTML html={data?.description || ''} className={`rj_editor_text ${Styles.rj_editor_text} mb-5`} />
                    {MapEmbed(data?.address || '')}
                </div>
                
            </div>
        )
    )
}

export default EventSingle;
