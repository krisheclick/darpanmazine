"use client";
import { useEffect, useState } from "react";
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


const api = {
    "response_data": {
        "posts": [
            {
                "title": "Team Bagry: Real Estate with Heart, Hustle, and Results ",
                "slug": "/news/team-bagry-real-estate-with-heart-hustle-and-results",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/1.png",
            },
            {
                "title": "Amy Sabharwal: Nurturing the Future with Quality Childcare",
                "slug": "/news/amy-sabharwal-nurturing-the-future-with-quality-childcare",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/2.png",
            },
            {
                "title": "Pioneering Oral Health Care in Surrey: Dr. Jeevan Gill",
                "slug": "/news/pioneering-oral-health-care-in-surrey-dr-jeevan-gill",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/3.png",
            },
            {
                "title": "Tamanna Punjabi Kapoora’s Serenade is A timeless ode to modern brides",
                "slug": "/news/tamanna-punjabi-kapooras-serenade-a-timeless-ode-to-modern-brides",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/tamanna_punjabi_kapoora’s.png",
            },
            {
                "title": "In retaliation for ‘Op Sindoor’, Pakistan halted newspapers to Indian  High Commision...",
                "slug": "/news/in-retaliation-for-op-sindoor-pakistan-halted-newspapers-to-indian-high-commission",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/op_sindoor_pakistan.jpg",
            },
            {
                "title": "BC Hydro's Site C dam is located on the Peace River, near St. John, British Columbia. ",
                "slug": "/news/bc-hydros-site-c-dam-located-on-the-peace-river-near-st-john-british-columbia",
                "tag": "Branded Content",
                "publishDate": "2025-07-25T12:19:01.000Z",
                "thumbnail_url": "deleted/peace_river.png",
            },

        ]
    }
};

type PostItem = {
    title?: string;
    slug?: string;
    tag?: string;
    publishDate?: string;
    thumbnail_url?: string;
}
const ReadMoreSlider = () => {
    const [data, setData] = useState<PostItem[]>([]);
    const [hasLoading, setLasLoading] = useState(true);
    const { otherSlider } = useLayoutContext();
    const fetchdata = async () => {
        try {
            // const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
            setData(api.response_data.posts);
        } catch (err: unknown) {
            console.log('Post API is something wrong: ', (err as Error).message);
        } finally {
            setLasLoading(false);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);
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
                            {!hasLoading && data ? (
                                data.map((value, index) => (
                                    <SwiperSlide key={index}>
                                        <EventsBox
                                            tag={value.tag}
                                            title={value.title}
                                            slug={value.slug}
                                            publish_date={value.publishDate}
                                            thumbnail={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/${value.thumbnail_url}`}
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
