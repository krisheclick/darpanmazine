"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';
import { usePostContext } from '@/context/post_context';

const Sliderbanner = () => {
    const {hasLoading, banner} = usePostContext();
    const bannerData = banner?.[0];
    const dateObj = new Date(bannerData?.publishDate ?? '');

    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        month: "short",
        day: "2-digit",
    })+ ', '+ dateObj.getFullYear();

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
    return (
        <div className={Styles.sliderBanner}>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={false}
                navigation
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false
                }}
                modules={[Autoplay, Navigation, FreeMode]}
                className='slider_banenr'
            >
                {!hasLoading ? (
                    <SwiperSlide className={Styles.bannerItem}>
                        <ImageFunction
                            className={Styles.poster}
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}${bannerData?.thumbnail?.file_url}`}
                            alt={bannerData?.heading || 'Poster Banner'}
                            style={{objectFit: "cover", objectPosition: "top"}}
                        />
                        <div className={Styles.bannerText}>
                            <div className={Styles.title}>{bannerData?.heading}</div>
                            <div className={Styles.datetime}>Darpan Desk | <span> {formattedDate}</span> <span>{formattedTime}</span></div>
                        </div>
                    </SwiperSlide>

                ) : (
                    <SwiperSlide className={Styles.bannerItem}>
                        <div className='custom_image fixedImage skeleton'></div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default Sliderbanner
