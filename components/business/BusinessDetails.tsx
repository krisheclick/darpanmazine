"use client";
import Styles from '../post/style.module.css';
import ImageFunction from '@/utlis/ImageFunction';
import { useEffect, useState } from 'react';
import NotFoundPage from '@/app/notFound';
import Share from '../common/share/Share';
import { usePostContext } from '@/context/post_context';

type PageData = {
    business_source?: string;
    business_heading?: string;
    business_slug?: string;
    business_description?: string;
    business_publish_date?: string;
    author?: string;
    business_category?: {
        business_category_name?: string;
        business_category_slug?: string;
    }
    images?: {
        file_url?: string;
    }[];
}
interface MostReadArticle {
    business_heading?: string;
    business_slug?: string;
    category?: {
        category_name?: string;
        permalink?: string;
        imageDir?: string;
    };
    thumbnail?: [{
        file_url?: string;
    }];
    business_publish_date?: string;
}

const BusinessDetails = ({slug = []}: {slug?: string[]})=> {
    const [notFound, setNotFoundPage] = useState(false);
    const [data, setData] = useState<PageData | null>(null);
    const { setLoading, hasLoading, setReadMostArticle, setArticle, setOtherSlider, setPostCategory} = usePostContext();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/${slug.at(-1)}`);
            const { response_code, response_data } = await response.json();
            if (!response_code) {
                setNotFoundPage(true);
                return;
            }
            setData(response_data.business);
            // setReadMostArticle(response_data?.mostarticles.map(
            //     (item: MostReadArticle) => ({
            //         ...item,
            //         'images': item?.thumbnail,
            //         'publishDate': item?.business_publish_date,
            //         'categoryview': {
            //             'categoryName': item?.category?.category_name,
            //             'permalink': `/events/${item?.category?.permalink}/`
            //         }
            //     })
            // ));

            setPostCategory({
                'categoryName': response_data?.business_category?.business_category_name,
                'slug': `/magazine/${response_data?.business_category?.business_category_slug}/`
            });
            setArticle(response_data?.mostBusiness.map(
                (item: MostReadArticle) => ({
                    ...item,
                    'heading': item?.business_heading,
                    'permalink': item?.business_slug,
                    'images': item?.thumbnail,
                    'publishDate': item?.business_publish_date,
                })
            ));
            setOtherSlider(true);
        } catch (err: unknown) {
            console.log('Business API error: ', (err as Error).message);
        } finally {
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
    const publishDate = data?.business_publish_date;
    const dateObj = new Date(publishDate ?? '');
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
    }) + ' ' + dateObj.getFullYear();

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        !hasLoading && (
            <div className={Styles.single_page}>
                <div className={Styles.topcontent}>
                    <div className={Styles.catName}>{data?.business_category?.business_category_name}</div>
                    <h1 className={Styles.pageTitle}>{data?.business_heading}</h1>
                    <div className={Styles.tagWrap}>
                        <span>by {data?.business_source},</span>
                        <span>{formattedDate}, </span>
                        <time dateTime={formattedTime}>{formattedTime}</time>
                    </div>
                </div>
                <ImageFunction
                    className={Styles.poster}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    alt={data?.business_heading || "Business Poster"}
                    staticImage={false}
                />
                <div className={Styles.single_content}>
                    <Share title={data?.business_heading}/>
                    <div className={`rj_editor_text ${Styles.rj_editor_text} mb-5`}
                        dangerouslySetInnerHTML={{ __html: data?.business_description || '' }}
                    />
                </div>
            </div>
        )
    )
}

export default BusinessDetails;