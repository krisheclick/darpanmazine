"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';

const Sliderbanner = () => {
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
                <SwiperSlide className={Styles.bannerItem}>
                    <ImageFunction
                        className={Styles.poster}
                        src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/innerbanner.png`}
                        alt={'Poster Banner'}
                    />
                    <div className={Styles.bannerText}>
                        <div className={Styles.title}>Interior health says parents should ensure kids caught <br /> up vaccination</div>
                        <div className={Styles.datetime}><span> 05 Dec, 2025</span> <span>10:34 AM</span></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Sliderbanner
