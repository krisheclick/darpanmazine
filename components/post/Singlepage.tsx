"use client";
import Image from 'next/image';
import Styles from './style.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import ImageFunction from '@/utlis/ImageFunction';
import { useLayoutContext } from '@/context/inner_context';
import { useCallback, useEffect, useState } from 'react';
import { usePostContext } from '@/context/post_context';
import NotFoundPage from '@/app/notFound';

type PageProps =  {
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
const Singlepage = ({url = []}:PageProps) => {
    const { setOtherSlider } = useLayoutContext();
    useEffect(() => {
        setOtherSlider(true);
        
        return () => setOtherSlider(false);
    }, [setOtherSlider]);

    const [notFound, setNotFoundPage] = useState(false);
    const [data, setData] = useState<PageData | null>(null);
    const {setLoading, hasLoading, setReadMostArticle} = usePostContext();
    const {setArticle} = useLayoutContext();

    const fetchData = async() => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${[...url].join('/')}`);
            const {response_code, response_data} = await response.json();
            if(!response_code){
                setNotFoundPage(true);
            }
            setData(response_data);
            setReadMostArticle(response_data?.most_read_articles);
            setArticle(response_data?.mostarticles);
        }catch(err: unknown){
            console.log('Category API is something wrong: ', (err as Error).message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(notFound){
        return <NotFoundPage />
    }

    const poster = data?.images?.[0]?.file_url;
    return (
        !hasLoading && (
            <div className={Styles.single_page}>
                <ImageFunction
                    className={Styles.poster}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    alt="Single Poster"
                    width={1247} height={742}
                    fallBack="assets/images/deleted/post-banner.png"
                    style={{objectFit: "cover", objectPosition: "top"}}
                />
                <div className={Styles.single_content}>
                    <div className={`d-flex align-items-start gap-4 ${Styles.post_share}`}>
                        <span className='mt-1'>Share in Post: </span>
                        <div className={`d-flex align-items-center flex-wrap ${Styles.social}`}>
                            <Link href="#"><FontAwesomeIcon icon={faXTwitter} /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faFacebook} /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faLinkedin} /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faLink} /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                        </div>
                    </div>
                    <div className={Styles.tagWrap}>
                        <span>Lifestyle, </span>
                        <time dateTime="12:30px">17 December 2025</time>
                    </div>
                    <h1 className={Styles.pageTitle }>{data?.heading}</h1>
                    <div className={`rj_editor_text ${Styles.rj_editor_text}`}
                        dangerouslySetInnerHTML={{__html: data?.description || ''}}
                    />

                    <figure className={Styles.posterAd}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/poster-ad.jpg`}
                            alt="Poster"
                            width={770}
                            height={164}
                            priority
                        />
                    </figure>
                </div>
            </div>
        )
    )
}

export default Singlepage
