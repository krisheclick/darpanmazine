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
import Link from 'next/link';

const Sliderbanner = () => {
    const { hasLoading, banner } = usePostContext();
    const bannerData = banner;
    // const dateObj = new Date(bannerData?.publishDate ?? '');

    const dateFormat = (dateObj: Date)=>{
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
            month: "short",
            day: "2-digit",
        }) + ', ' + dateObj.getFullYear();

        const formattedTime = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
        return `<span> ${formattedDate}</span> <span>${formattedTime}</span>`
    }
    
    return (
        hasLoading ? (
            <div className={Styles.sliderBanner}>
                <div className={Styles.bannerItem}>
                    <div className='custom_image fixedImage skeleton'></div>
                </div>
            </div>
        ) : (

            banner && (
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
                        {banner.map((bannerData, index) => (
                            <SwiperSlide key={index} className={Styles.bannerItem}>                            
                                <ImageFunction
                                    className={Styles.poster}
                                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${bannerData?.thumbnail?.file_url}`}
                                    alt={bannerData?.heading || 'Poster Banner'}
                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                />
                                <div className={Styles.bannerText}>
                                    <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/${bannerData.categoryview?.slug??bannerData.categoryview?.permalink}${bannerData.permalink}`} className={`${Styles.title} color-inherit`}>{bannerData?.heading}</Link>
                                    <div className={Styles.datetime}>Darpan Desk | <span dangerouslySetInnerHTML={{ __html: dateFormat(new Date(bannerData?.publishDate?? '')) }}/></div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                </div>
            )
        )
    )
}

export default Sliderbanner