"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import Image from 'next/image';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Styles from './style.module.css';

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
                    <figure className={Styles.poster}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}innerbanner.png`}
                            alt={'Poster Banner'}
                            fill
                            priority
                            onError={(e) => {
                                (e.target as HTMLImageElement).src= `${process.env.NEXT_PUBLIC_ASSET_PREFIX}no-image.jpg`;
                            }}

                            sizes="(max-width: 1280px) 100vw, 65vw"
                        />
                    </figure>
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
