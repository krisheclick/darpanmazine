"use client";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Styles from './style.module.css';
import { usePhotosContext } from '@/context/photos_context';
import { useState } from 'react';
import ImageFunction from '@/utlis/ImageFunction';

interface DataItem {
    photo_heading?: string;
    publish_date?: string;
    photo_category?: {
        photo_category_name?: string;
        photo_category_slug?: string;
    };
    images?: {
        file_url?: string;
    }[];
}

const SliderPoster = ({ banner }: { banner: DataItem | null }) => {
    const { hasLoading } = usePhotosContext();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    if (!banner) return null;
    const bannerData = banner.images;
    const dateObj = new Date(banner?.publish_date ?? '');
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
        <div className={Styles.vertical_slider}>
            <div className={Styles.posterSliderWrapper}>
                <Swiper
                    spaceBetween={0}
                    // direction={'vertical'}
                    slidesPerView={1}
                    loop={(bannerData?.length || 0) > 1}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
                    modules={[Autoplay, Navigation, Thumbs, FreeMode]}
                    className={`verticalPosterSlider ${Styles.verticalPosterSlider ?? ''}`}
                >
                    {!hasLoading ? (
                        bannerData?.map((data, index) => {
                            return (
                                <SwiperSlide key={index} className={Styles.sliderItem}>
                                    <ImageFunction
                                        className={Styles.poster}
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data?.file_url}`}
                                        alt={`${banner.photo_heading}-${index}` || "Thumbnail"}
                                        style={{ objectFit: "cover", objectPosition: "top" }}
                                    />
                                </SwiperSlide>
                            )
                        })
                    ) : (
                        <SwiperSlide className={Styles.sliderItem}>
                            <div className="skeleton skeletonFill"></div>
                        </SwiperSlide>
                    )}
                </Swiper>
                <div className={Styles.bannerText}>
                    <span className={Styles.catName}>{banner.photo_category?.photo_category_name}</span>
                    <div className={`title text-white ${Styles.title ?? ''}`}>{banner.photo_heading}</div>
                    <div className={Styles.datetime}><span>{formattedDate}</span> <span>{formattedTime}</span></div>
                </div>
            </div>
            <div className={Styles.thumb_slider}>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    direction="vertical"
                    spaceBetween={8}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className={`vertical_thumbslider ${Styles.vertical_thumbslider}`}
                    breakpoints={{
                        768: { slidesPerView: 3 },
                        1200: { slidesPerView: 4.5 },
                    }}
                >
                    {!hasLoading ? (
                        bannerData?.map((data, index) => {
                            return (
                                <SwiperSlide key={index} className={Styles.thumbItem}>
                                    <ImageFunction
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data?.file_url}`}
                                        alt={`${banner.photo_heading}-${index}` || "Thumbnail"}
                                        style={{ objectFit: "cover", objectPosition: "top" }}
                                    />
                                </SwiperSlide>
                            )
                        })
                    ) : (
                        Array.from({ length: 4 }).map((_, index) => (
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

export default SliderPoster
