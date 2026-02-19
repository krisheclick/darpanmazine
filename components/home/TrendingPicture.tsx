"use client";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import PhotoBox from "../common/box/PhotoBox";
import Styles from "@/app/(main)/(home)/page.module.css";
import Link from "next/link";
import PhotoBoxSkeleton from "../common/box/PhotoBoxSkeleton";

type DataItem = {
    heading?: string;
    url?: string;
    author?: string;
    short_description?: string;
    image_dir?: string;
    thumb_image?: string | string[] | null;
    publish_date?: string;
    thumbnail?: {
        file_name?: string;
        file_url?: string;
    }
}

interface CategoryDataType {
    photo_category_id?: string;
    photo_category_name?: string;
    photo_category_slug?: string;
}
const TrendingPicture = () => {
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<DataItem[] | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryDataType[] | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/day-in-pictures`);
            const { response_data } = await response.json();
            setData(response_data?.data);

            // Category
            const resposnseCategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/category/`);
            const { response_data: category_response } = await resposnseCategory.json();
            setCategoryData(category_response);
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
        <>
            <div className="rj_content border-block mb-lg-4">
                <h4 className="title mb-0"><Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/photos`} className="text-dark">Day in Pictures</Link> </h4>
                <div className={Styles.videoCategory}>
                    <ul className="inlineList text-uppercase">
                        {categoryData?.slice(0, 3)?.map((value, index) => (
                            <li key={index}>
                                <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/photos/${value.photo_category_slug}`}>{value.photo_category_name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="pictureList">
                <Swiper
                    spaceBetween={18}
                    slidesPerView={data && data.length > 0 ? Math.min(data.length, 3) : 3}
                    loop={(data?.length || 0) > 3}
                    navigation
                    autoplay={{
                        delay: 4000, // 3 seconds
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation, FreeMode]}
                    className="picture_slider"
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
                            slidesPerView: 3,
                        },
                    }}
                >
                    {!hasLoading && data ? (
                        data?.map((value, index) => {
                            // const poster = typeof value.thumb_image === "string" ? value.thumb_image.split(",#")[0].split("|")[0] : "";
                            return (
                                <SwiperSlide key={index}>
                                    <PhotoBox
                                        tag=""
                                        title={value.heading}
                                        slug={value.url}
                                        thumbnail={value?.thumbnail?.file_url}
                                    />
                                </SwiperSlide>
                            )
                        })) : (
                        [...Array(4)].map((_, index) => (
                            <SwiperSlide key={index}>
                                <PhotoBoxSkeleton text={true} />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </>
    )
}

export default TrendingPicture
