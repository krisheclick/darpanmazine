"use client";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import VideosliderBox from "../videos/VideosliderBox";

type VideoItem = {
    heading?: string;
    url?: string;
    author?: string;
    short_description?: string;
    thumb_image?: string | string[] | null;
    image_dir?: string;
    publish_date?: string;
    category: {
        name?: string;
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
        >
            {data?.map((value, index) => {
                const thumb_image = value?.thumb_image;
                const videoArray = typeof thumb_image === "string" ? thumb_image.split('|') : "";
                return (
                    <SwiperSlide className="videoBox" key={index}>
                        <VideosliderBox
                            title={value?.heading}
                            url={value?.url}
                            image_dir={value?.image_dir}
                            poster={videoArray[0]}
                            videoTimer={videoArray[1]}
                            publish_date={value?.publish_date}
                        />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default VideoSlider;
