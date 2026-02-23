"use client";
import { useEffect, useState } from "react";
import Styles from "./style.module.css";
import NotFoundPage from "@/app/notFound";
import Share from "@/components/common/share/Share";
import { useVideosContext } from "@/context/video_context";
import BollywoodVideoGallery from "./BollywoodGallery";
import ImageFunctionLink from "@/utlis/ImageFunctionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import DangerHTML from "@/components/common/DangerHTML";
interface DataItem {
    source?: string;
    author?: string;
    heading?: string;
    permalink?: string;
    video_duration?: string;
    video_url?: string;
    description?: string;
    publish_date?: string;
    category?: {
        category_name?: string;
        permalink?: string;
    };
    images?: {
        file_url?: string;
    }[];
}

const DetailsPage = ({ slug }: { slug: string[] }) => {
    const [currentUrl, ...urlArray] = [...slug].reverse();
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<DataItem | null>(null);
    const { setLoading, setFeaturedVideo, setMostVideo, setadTrue } = useVideosContext();
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`
                ${process.env.NEXT_PUBLIC_API_URL}/videos/${currentUrl}`,
                { cache: "no-store" });

            const { response_data, response_code } = await response.json();
            if (!response_code) {
                setNotFound(true);
                return;
            }
            setData(response_data);
            setFeaturedVideo(response_data?.is_featured);
            setMostVideo(response_data?.most_videos);
            setadTrue(false);
        } catch (err: unknown) {
            console.log('Videos APi Response is somethig wrong', (err as Error).message);
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
        <div className={Styles.details_page}>
            <div className={Styles.iframePoster} dangerouslySetInnerHTML={{ __html: data?.video_url||'' }} />
            {/* <div className={`position-relative ${Styles.imageWraper ?? ''}`}>
                <ImageFunctionLink
                    href={data?.video_url}
                    className={Styles.poster}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    alt={data?.heading || "Single Poster"}
                    target={true}
                />

                <div className={Styles.youtubeIcon}>
                    <FontAwesomeIcon icon={faYoutube} />
                </div>

            </div> */}
            <div className={Styles.single_content}>
                <Share title={data?.heading} classname="videoPost" />
                <div className={Styles.topcontent}>
                    <div className={Styles.catName}>{data?.category?.permalink}</div>
                    <h1 className={Styles.pageTitle}>{data?.heading}</h1>
                    <div className={Styles.tagWrap}>
                        <span>by {data?.author},</span>
                        <span>{formattedDate}, </span>
                        <time dateTime={formattedTime}>{formattedTime}</time>
                    </div>
                </div>
                <DangerHTML html={data?.description || ''} className={`rj_editor_text ${Styles.rj_editor_text} mb-5`} />

                <BollywoodVideoGallery catLink={data?.category?.permalink} />
            </div>
        </div>
    )
}

export default DetailsPage;