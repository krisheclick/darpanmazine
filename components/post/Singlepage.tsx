"use client";
import Image from 'next/image';
import Styles from './style.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import ImageFunction from '@/utlis/ImageFunction';
import { useEffect, useState } from 'react';
import { usePostContext } from '@/context/post_context';
import NotFoundPage from '@/app/notFound';
import { usePathname } from 'next/navigation';
import Share from '../common/share/Share';

type PageProps = {
    url?: string[];
}
type PageData = {
    heading?: string;
    author?: string;
    description?: string;
    publishDate?: string;
    permalink?: string;
    categoryview?: {
        categoryName?: string;
        slug?: string;
        imageDir?: string;
    }
    images?: {
        file_url?: string;
    }[];
}
const Singlepage = ({ url = [] }: PageProps) => {
    const pathname = usePathname();
    const [notFound, setNotFoundPage] = useState(false);
    const [data, setData] = useState<PageData | null>(null);
    const { setLoading, hasLoading, setReadMostArticle, setOtherSlider, setArticle, setPostCategory } = usePostContext();
    useEffect(() => {
        setOtherSlider(true);

        return () => setOtherSlider(false);
    }, [setOtherSlider]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${[...url].join('/')}`);
            const { response_code, response_data } = await response.json();
            if (!response_code) {
                setNotFoundPage(true);
            }
            setData(response_data);
            setReadMostArticle(response_data?.most_read_articles);
            setArticle(response_data?.mostarticles);
            setPostCategory(response_data?.categoryview);
        } catch (err: unknown) {
            console.log('Category API is something wrong: ', (err as Error).message);
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
    const publishDate = data?.publishDate;
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
                    <div className={Styles.catName}>{data?.categoryview?.categoryName}</div>
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
                    alt={data?.heading || "Single Poster"}
                    staticImage={true}
                />
                <div className={Styles.single_content}>
                    <Share/>
                    {/* <div className={`d-flex align-items-start gap-4 post_share ${Styles.post_share ?? ''}`}>                        
                        <span className='mt-1'>Share in Post: </span>
                        <div className={`d-flex align-items-center flex-wrap post_social ${Styles.social}`}>
                            <Link href={`https://twitter.com/intent/tweet?text=${data?.heading}&url=${process.env.NEXT_PUBLIC_ENV_URL}${pathname}`}><FontAwesomeIcon icon={faXTwitter} /></Link>
                            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_ENV_URL}${pathname}`}><FontAwesomeIcon icon={faFacebook} /></Link>
                            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_ENV_URL}${pathname}`}><FontAwesomeIcon icon={faLinkedin} /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faLink} /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                        </div>
                    </div> */}
                    <div className={`rj_editor_text ${Styles.rj_editor_text}`}
                        dangerouslySetInnerHTML={{ __html: data?.description || '' }}
                    />
                    <div className="posterAd">
                        <ImageFunction
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/poster-ad.jpg`}
                            alt="Poster"
                            width={770}
                            height={164}
                        />
                    </div>
                </div>
            </div>
        )
    )
}

export default Singlepage
