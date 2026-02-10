"use client";
import { usePhotosContext } from '@/context/photos_context';
import Link from 'next/link';
import ImageFunction from '@/utlis/ImageFunction';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import Styles from './style.module.css';
import ImageFunctionLink from '@/utlis/ImageFunctionLink';

const FeaturedGalleries = () => {
    const { hasLoading, featuredData } = usePhotosContext();
    return (
        featuredData && (
            <div className={Styles.featuredGallery}>
                <div className={Styles.bar_title}>Featured Galleries</div>
                <div className={Styles.gallery_slider}>
                    {!hasLoading ? (
                        <Swiper
                            navigation
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className="gallery_slider"
                        >
                            {featuredData.slice(0, 6).map((value, index) => (
                                <SwiperSlide key={index}>
                                    <ImageFunctionLink
                                        href={`${process.env.NEXT_PUBLIC_ENV_URL}/photos/${value.photo_category?.photo_category_slug}/${value.photo_slug}`}
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.thumbnail?.file_url}`}
                                        alt={value.photo_heading || "Thumbnail poster"}
                                        className={Styles.poster}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className={`custom_image fixedImage ${Styles.poster}`}>
                            <div className="skeleton skeletonFill"></div>
                        </div>
                    )}
                </div>
            </div>
        )
    )
}

export default FeaturedGalleries
