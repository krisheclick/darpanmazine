"use client";
import EventsBox from "../common/box/Box";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import Styles from "./style.module.css";
import { Autoplay, FreeMode } from "swiper/modules";
import BoxSkeleton from "../common/box/BoxSkeleton";

type DataItem = {
    type?: string;
    category?: {
        name?: string;
    }
    heading?: string;
    url?: string;
    short_description?: string;
    thumbnail?: {
        file_url?: string;
        file_thumb_url?: string;
    }
    author?: string;
    publish_date?: string;
}
const BcEventsList = () => {

    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<DataItem[] | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/editors-pick`);
            const { response_data } = await response.json();
            setData(response_data?.data);
        } catch (err: unknown) {
            console.log('Events Data is something wrong: ', (err as Error).message);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Swiper
            spaceBetween={16}
            slidesPerView={data && data.length > 0 ? Math.min(data.length, 3) : 3}
            loop={(data?.length || 0) > 3}
            modules={[Autoplay, FreeMode]}
            autoplay={{
                delay: 30000,
                disableOnInteraction: false
            }}
            className={`bcEventsSlider ${Styles.bcEventsSlider}`}
        >
            {!hasLoading && data ? (
                data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <EventsBox
                            tag={value.category?.name}
                            title={value.heading}
                            slug={value.url}
                            author_name={value.author}
                            publish_date={value.publish_date}
                            thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.thumbnail?.file_thumb_url}`}
                            errorImg="assets/images/deleted/tamanna_punjabi_kapoora’s.png"
                        />
                    </SwiperSlide>
                ))
            ) : (
                [...Array(4)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <BoxSkeleton />
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    )
}

export default BcEventsList
