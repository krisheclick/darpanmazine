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
    category: {
        name: string;
    }
    publish_date?: string;
}
const TrendingList = () => {
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<DataItem[] | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/trendings`);
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
            spaceBetween={16}
            // slidesPerView={data && data.length > 0 ? Math.min(data.length, 4) : 4}
            loop={(data?.length || 0) > 4}
            navigation
            modules={[Autoplay, Navigation, FreeMode]}
            className="trending_slider"
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
            {!hasLoading && data ?
                data?.map((value, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <EventsBox
                                tag={value.category.name}
                                title={value.heading}
                                slug={value.url}
                                author_name={value.author}
                                publish_date={value.publish_date}
                                thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.thumbnail?.file_url}`}
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
                )
            }
        </Swiper>
    )
}

export default TrendingList
