"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import { useEffect, useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Styles from "./home-style.module.css"
import Image from "next/image";
import Link from "next/link";
import ImageFunction from "@/utlis/ImageFunction";

type DataItem = {
    heading?: string;
    url?: string;
    type?: string;
    thumbnail?: {
        file_url?: string;
    }
    publish_date?: string;
    author?: string;
    category?: {
        name?: string;
    };
}
const HomeBannerSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [banner, setBanner] = useState<DataItem[] | null>(null);
    const [hasLoading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hot/banners`, { cache: "no-store" });
            const { response_data } = await response.json();
            setBanner(response_data?.data ?? []);
        } catch (err: unknown) {
            console.log('Banner data is something API worng: ', (err as Error).message)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className={Styles.banner}>
            <Swiper
                spaceBetween={0}
                slidesPerView={Math.min(banner?.length || 0, 1)}
                loop={(banner?.length || 0) > 1}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
                modules={[Autoplay, Navigation, Thumbs, FreeMode]}
                className={`homeslider ${Styles.homeslider ?? ''}`}
            >
                {!hasLoading ? (
                    banner?.map((data, index) => {
                        const { heading, url, thumbnail, publish_date } = data;
                        // const poster = typeof thumb_image === "string" ? thumb_image.split('#,#') : [];
                        const dateObj = new Date(publish_date ?? '');
                        const formattedDate = dateObj.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short"
                        }) + ', ' + dateObj.getFullYear();

                        const formattedTime = dateObj.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        });
                        return (
                            <SwiperSlide key={index} className={Styles.sliderItem}>
                                <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}${url}`} className="d-block color-inherit">
                                    <ImageFunction
                                        className={Styles.poster}
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${thumbnail?.file_url}`}
                                        alt={heading || "Poster"}
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className={Styles.bannerText}>
                                        <div className={Styles.title}
                                            dangerouslySetInnerHTML={{ __html: heading ?? '' }}
                                        />
                                        <div className={Styles.datetime}><span>{formattedDate}</span> <span>{formattedTime}</span></div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                ) : (
                    <SwiperSlide className={Styles.sliderItem}>
                        <div className={`${Styles.poster} skeleton`}></div>
                        <div className={Styles.bannerText}>
                            <div className={Styles.title}>
                                <div className="skeleton skeletonText"></div>
                                <div className="skeleton skeletonText w-75"></div>
                            </div>
                            <div className="skeleton skeletonText w-50"></div>

                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className={Styles.thumb_slider}>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={8}
                    loop={(banner?.length ?? 0) > 2}
                    breakpoints={{
                        768: { slidesPerView: 4 },
                        1200: { slidesPerView: 10 },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    autoplay={{
                        delay: 5000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="banner_thumbslider"
                >
                    {!hasLoading ? (
                        banner?.map((data, index) => {
                            const { heading, thumbnail} = data;
                            return (
                                <SwiperSlide key={index} className={Styles.thumbItem}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${thumbnail?.file_url}`}
                                        alt={heading || "Thumbnail"}
                                        fill
                                        priority
                                        style={{ objectFit: "cover" }}
                                    />
                                </SwiperSlide>
                            )
                        })
                    ) : (
                        Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide
                                key={index}
                                className={`${Styles.thumbItem} ${Styles.skeleton} skeleton`}
                            />
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    )
}

export default HomeBannerSlider;