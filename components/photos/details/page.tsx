"use client";
import { useEffect, useState } from "react";
import SliderPoster from "./SliderPoster";
import Styles from "./style.module.css";
import { usePhotosContext } from "@/context/photos_context";
import NotFoundPage from "@/app/notFound";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ImageFunction from "@/utlis/ImageFunction";
import BollywoodGallery from "./BollywoodGallery";
interface DataItem {
    photo_source?: string;
    photo_heading?: string;
    photo_slug?: string;
    photo_description?: string;
    publish_date?: string;
    photo_category?: {
        photo_category_name?: string;
        photo_category_slug?: string;
    };
    images?: {
        file_url?: string;
    }[];
}
type BannerItem = {
    thumbnail: string;
};

const DetailsPage = ({ slug }: { slug: string[] }) => {
    const [currentUrl, ...urlArray] = [...slug].reverse();
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<DataItem | null>(null);
    const { setLoading, setMostViewed, setFeaturedData } = usePhotosContext();
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`
                ${process.env.NEXT_PUBLIC_API_URL}/photos/${currentUrl}`,
                { cache: "no-store" });

            const { response_data, response_code } = await response.json();
            if (!response_code) {
                setNotFound(true);
                return;
            }
            setData(response_data?.photo);
            setFeaturedData(response_data?.is_featured);
            setMostViewed(response_data?.mostPhoto);
        } catch (err: unknown) {
            console.log('Photos APi Response is somethig wrong', (err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (notFound) {
        return <NotFoundPage />
    }

    return (
        <div className={Styles.details_page}>
            <SliderPoster banner={data} />
            <div className={Styles.single_content}>
                <div className={`d-flex align-items-start gap-4 post_share ${Styles.post_share ?? ''}`}>
                    <span className='mt-1'>Share in Post: </span>
                    <div className={`d-flex align-items-center flex-wrap post_social ${Styles.social}`}>
                        <Link href="#"><FontAwesomeIcon icon={faXTwitter} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faFacebook} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faLinkedin} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faLink} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                    </div>
                </div>
                <div className={`rj_editor_text ${Styles.rj_editor_text}`}
                    dangerouslySetInnerHTML={{ __html: data?.photo_description || '' }}
                />

                <BollywoodGallery />

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
}

export default DetailsPage;