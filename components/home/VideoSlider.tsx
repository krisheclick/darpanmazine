"use client";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import VideosliderBox from "../videos/VideosliderBox";
import VideoSkeleton from "../videos/videoSkeleton";
import Link from "next/link";
import Styles from "@/app/(main)/(home)/page.module.css";

type VideoItem = {
    heading?: string;
    url?: string;
    author?: string;
    short_description?: string;
    thumb_image?: string | string[] | null;
    image_dir?: string;
    publish_date?: string;
    video_duration?: string;
    category: {
        name?: string;
    };
    thumbnail?: {
        file_name?: string;
        file_url?: string;
    }
}

interface CategoryDataType {
    category_id?: string;
    category_name?: string;
    permalink?: string;
}
const VideoSlider = () => {
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<VideoItem[] | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryDataType[] | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const resposnse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/video-slider`);
            const { response_data } = await resposnse.json();
            setData(response_data?.data);

            // Video category
            const resposnseCategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/categories`);
            const { response_data: category_response } = await resposnseCategory.json();
            setCategoryData(category_response);
        } catch (err: unknown) {
            console.log('Video API is something wrong: ', (err as Error).message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>

            <div className="rj_content border-block mb-lg-4">
                <h5 className="title mb-0"><Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/videos`} className="text-dark">Videos</Link></h5>
                <div className={Styles.videoCategory}>
                    <ul className="inlineList text-uppercase">
                        {categoryData?.slice(0, 3)?.map((value, index) => (
                            <li key={index}>
                                <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/videos/${value.permalink}`}>{value.category_name?.toUpperCase()}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="videoList">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={data && data.length > 0 ? Math.min(data.length, 3) : 3}
                    loop={(data?.length || 0) > 3}
                    navigation
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation, FreeMode]}
                    className="video_slider"
                    breakpoints={{
                        0: {
                            slidesPerView: 1.2,
                            spaceBetween: 12,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {!hasLoading && data ? (
                        data?.map((value, index) => {
                            return (
                                <SwiperSlide className="videoBox" key={index}>
                                    <VideosliderBox
                                        title={value?.heading}
                                        url={value?.url}
                                        poster={value?.thumbnail?.file_url}
                                        videoTimer={value.video_duration}
                                        publish_date={value?.publish_date}
                                        strip={true}
                                    />
                                </SwiperSlide>
                            )
                        })) : (
                        [...Array(4)].map((_, index) => (
                            <SwiperSlide className="videoBox" key={index}>
                                <VideoSkeleton />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </>
    )
}

export default VideoSlider;
