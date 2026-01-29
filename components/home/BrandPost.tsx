"use client";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import EventsBox from "../common/box/Box";
import BoxSkeleton from "../common/box/BoxSkeleton";

type DataItem = {
    heading?: string;
    url?: string;
    author?: string;
    short_description?: string;
    thumbnail?: {
        file_url?: string;
    }
    publish_date?: string;
}
const BrandPost = () => {
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<DataItem[] | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/slideshows`);
            const { response_data } = await response.json();
            setData(response_data?.data);
        } catch (err: unknown) {
            console.log('Trendings API fetch is something wrong: ', (err as Error).message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={data && data.length > 0 ? Math.min(data.length, 4) : 4}
            loop={(data?.length || 0) > 4}
            navigation
            autoplay={{
                delay: 3000, // 3 seconds
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, FreeMode]}
            className="brands_slider"
        >
            {!hasLoading && data ?
                data?.map((value, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <EventsBox
                                tag="Events"
                                title={value.heading}
                                slug={value.url}
                                author_name={value.author}
                                publish_date={value.publish_date}
                                thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value?.thumbnail?.file_url}`}                                
                                errorImg="assets/images/deleted/tamanna_punjabi_kapoora’s.png"
                            />
                        </SwiperSlide>
                    )
                }) : (
                    [...Array(4)].map((_, index) => (
                        <SwiperSlide key={index}>
                            <BoxSkeleton />
                        </SwiperSlide>
                    ))
                )}
        </Swiper>
    )
}

export default BrandPost
