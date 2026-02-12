"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Styles from './style.module.css';
import { useVideosContext } from '@/context/video_context';
import VideosliderBox from '../VideosliderBox';
const BollywoodVideoGallery = ({catLink}: {catLink?: string}) => {
    const {hasLoading, mostVideo} = useVideosContext();
    return (
        hasLoading ? (
            <></>
        ) : (
            mostVideo && mostVideo.length > 0 &&(
                <div className={`section-area sm ${Styles.bollywoodGallery ?? ''}`}>
                    <div className="rj_content border-block">
                        <h3 className="title">More Bollywood Videos</h3>
                    </div>
                    <div className={Styles.galleryList}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={16}
                            loop
                            navigation
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            
                            className={`bollywoodslider ${Styles.bollywoodslider ?? ''}`}
                            breakpoints={{
                                768: { slidesPerView: 3 },
                                1200: { slidesPerView: 3 },
                            }}
                        > 
                            {mostVideo.map((value, index) => (
                                <SwiperSlide key={index}>
                                    <VideosliderBox
                                        title={value?.heading}
                                        url={`/videos/${catLink}/${value?.permalink}`}
                                        poster={value?.images?.[0]?.file_url}
                                        className="innerVideos"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )
        )
    )
}

export default BollywoodVideoGallery
