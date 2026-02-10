"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePhotosContext } from '@/context/photos_context';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Styles from './style.module.css';
import PhotoBox from '@/components/common/box/PhotoBox';
const BollywoodGallery = () => {
    const {hasLoading, mostViewed} = usePhotosContext();
    return (
        hasLoading ? (
            <></>
        ) : (
            mostViewed && mostViewed.length > 0 &&(
                <div className={`section-area sm ${Styles.bollywoodGallery ?? ''}`}>
                    <div className="rj_content border-block">
                        <h3 className="title">More Bollywood Galleries</h3>
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
                            {mostViewed.map((value, index) => (
                                <SwiperSlide key={index}>
                                    <PhotoBox 
                                        className=" innerPhotos"
                                        tag={value.photo_category?.photo_category_name}
                                        title={value.photo_heading}
                                        slug={`/${value.photo_category?.photo_category_slug}/${value.photo_slug}`}
                                        thumbnail={value.thumbnail?.file_url}
                                        thumb_count={value.thumb_count}
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

export default BollywoodGallery
