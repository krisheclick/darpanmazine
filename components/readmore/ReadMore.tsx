"use client";
import EventsBox from "../common/box/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Container } from 'react-bootstrap';
import Styles from './style.module.css';
import { useLayoutContext } from "@/context/inner_context";
import BoxSkeleton from "../common/box/BoxSkeleton";
const ReadMoreSlider = () => {
    const { otherSlider, article, postCategory} = useLayoutContext();

    return (
        otherSlider && (
            <div className={`section-area ${Styles.readMore_section ?? ''}`}>
                <Container>
                    <div className="rj_content border-block border-another">
                        <div className="title mx-auto">Read More</div>
                    </div>
                    <div className={Styles.postList}>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            loop={false}
                            navigation
                            autoplay={{
                                delay: 5000,
                                pauseOnMouseEnter: true,
                                disableOnInteraction: false
                            }}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className={`other_slider ${Styles.other_slider ?? ''}`}
                        >
                            {article ? (
                                article.map((value, index) => (
                                    <SwiperSlide key={index}>
                                        <EventsBox
                                            title={value.heading}
                                            slug={`${postCategory?.slug}${value.permalink}`}
                                            publish_date={value.publishDate}
                                            thumbnail={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.images?.[0]?.file_url}`}
                                            timestring={true}
                                        />
                                    </SwiperSlide>
                                ))) : (
                                [...Array(4)].map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <BoxSkeleton />
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    </div>

                </Container>
            </div>
        )
    )
}

export default ReadMoreSlider
