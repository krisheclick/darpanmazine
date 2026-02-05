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
const VideoSlider = () => {
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<VideoItem[] | null>(null);

    const fetchData = async () => {
        try {
            const resposnse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/video-slider`);
            const { response_data } = await resposnse.json();
            setData(response_data?.data);
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
        <Swiper
            spaceBetween={16}
            slidesPerView={data && data.length > 0 ? Math.min(data.length, 4) : 4}
            loop={(data?.length || 0) > 4}
            navigation
            autoplay={{
                delay: 3000, // 3 seconds
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
                1600: {
                    slidesPerView: 4,
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
    )
}

export default VideoSlider;
