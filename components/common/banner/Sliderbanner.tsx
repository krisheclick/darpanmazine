import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';
import Link from 'next/link';

interface BannerItem {
    poster: string;
    link: string;
    title?: string;
    publishDate?: string;
}

interface BannerProps {
    hasLoading: boolean;
    bannerData?: BannerItem[];
}
const Sliderbanner = ({hasLoading, bannerData}: BannerProps) => {
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

            bannerData && (
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
                        {bannerData.map((bannerItem, index) => (
                            <SwiperSlide key={index} className={Styles.bannerItem}>                            
                                <ImageFunction
                                    className={Styles.poster}
                                    src={bannerItem?.poster}
                                    alt={bannerItem?.title || 'Poster Banner'}
                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                />
                                <div className={Styles.bannerText}>
                                    <Link href={bannerItem?.link} className={`${Styles.title} color-inherit`}>{bannerItem?.title}</Link>
                                    <div className={Styles.datetime}>Darpan Desk | <span dangerouslySetInnerHTML={{ __html: dateFormat(new Date(bannerItem?.publishDate?? '')) }}/></div>
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
