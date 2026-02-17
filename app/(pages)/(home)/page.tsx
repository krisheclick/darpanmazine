import { Container } from "react-bootstrap";
import Styles from "./page.module.css";
import HomeBannerSlider from "@/components/common/banner/Homebanner";
import Homebannerad from "@/components/common/advertiesment/banner/Homebannerad";
import BcEventsList from "@/components/home/BcEvents";
import TrendingList from "@/components/home/Trends";
import BrandPost from "@/components/home/BrandPost";
import TrendingPicture from "@/components/home/TrendingPicture";
import QuizAd from "@/components/common/advertiesment/poster-ad/QuizAd";
import MusicAd from "@/components/common/advertiesment/poster-ad/MusicAd";
import MobileAd from "@/components/common/advertiesment/poster-ad/MobileAd";
import OfferAd from "@/components/common/advertiesment/poster-ad/OfferAd";
import BlogAd from "@/components/common/advertiesment/poster-ad/BlogAd";
import PosterAd from "@/components/common/advertiesment/poster-ad/PosterAd";
import TrendingAd from "@/components/common/advertiesment/poster-ad/TrendingAd";
import Newsletter from "@/components/newsletter/Newsletter";
import MagazinePost from "@/components/home/MagazinePost";
import TrendingPostAd from "@/components/common/advertiesment/poster-ad/TrendingPostAd";
import VideoSlider from "@/components/home/VideoSlider";
import VideoAd from "@/components/common/advertiesment/poster-ad/VideoAd";
import ImageFunction from "@/utlis/ImageFunction";

export default function Home() {

    const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";
    return (
        <div className={Styles.page}>
            <div className={Styles.advertiesment}>
                <Container>
                    <ImageFunction
                        className={`max-width mx-auto ${Styles.poster}`}
                        src={`${assetPrefix}assets/images/poster-ad.jpg`}
                        alt="Poster"
                        width={770}
                        height={164}
                    />
                </Container>
            </div>

            {/* Banner Part */}
            <div className={Styles.banner}>
                <Container>
                    <div className="columnRow">
                        <article className={Styles.sliderColumn}>
                            <HomeBannerSlider />
                        </article>
                        <aside className={Styles.advertiesmentColumn}>
                            <Homebannerad />
                        </aside>
                    </div>
                </Container>
            </div>

            {/* Around BC */}
            <div className={`section-area ${Styles.aroundBc ?? ''}`}>
                <Container>
                    <div className="rj_content border-block">
                        <h1 className="title">Around BC</h1>
                    </div>
                    <div className="columnRow">
                        <article className={Styles.eventsList}>
                            <BcEventsList />
                        </article>
                        <aside className={Styles.advertiesmentColumn}>
                            <VideoAd />
                            <QuizAd />
                        </aside>
                    </div>
                </Container>
            </div>

            {/* What's Trending */}
            <div className={`section-area ${Styles.whatsTrending ?? ''}`}>
                <Container>
                    <div className="columnRow">
                        <aside className={Styles.advertiesmentColumn}>
                            <TrendingAd />
                        </aside>
                        <article className={Styles.eventsList}>
                            <div className="rj_content border-block">
                                <h2 className="title">{`What's Trending`}</h2>
                            </div>
                            <TrendingList />
                        </article>
                    </div>
                </Container>
            </div>

            {/* Collapse Section */}
            <div className="section-area">
                <Container>
                    <div className="columnRow">
                        <article className={Styles.mainContent}>
                            <div className={Styles.newsletterArea}>
                                <Newsletter />
                                <ImageFunction
                                    className={`max-width ${Styles.overlook_poster}`}
                                    src={`${assetPrefix}assets/images/deleted/overlook-ad.png`}
                                    alt="Poster"
                                    width={770}
                                    height={164}
                                />
                            </div>
                            {/* Branded Content */}
                            <div className={`section-area sm ${Styles.brandPost ?? ''}`}>
                                <div className="rj_content border-block">
                                    <h3 className="title">Branded Content</h3>
                                </div>
                                <div className="brandList">
                                    <BrandPost />
                                </div>
                            </div>

                            {/* Day in Pictures */}
                            <div className={`section-area sm ${Styles.picturePost ?? ''}`}>
                                <TrendingPicture />
                            </div>

                            {/* Videos */}
                            <div className={`section-area sm ${Styles.videoPost ?? ''}`}>
                                <VideoSlider />
                            </div>

                            {/* Featured From Darpan Magazine */}
                            <div className={`section-area sm ${Styles.featuredMagazine ?? ''}`}>
                                <div className="rj_content border-block">
                                    <h6 className="title">Featured From Darpan Magazine</h6>
                                </div>
                                <div className="magazineList">
                                    <MagazinePost />
                                </div>
                            </div>

                            {/* Advertiesment */}
                            <ImageFunction
                                className={`max-width ${Styles.ipad_poster}`}
                                src={`${assetPrefix}assets/images/deleted/ipad.png`}
                                alt="Poster"
                                width={770}
                                height={164}
                            />
                        </article>
                        <aside className={Styles.mainContentAd}>
                            <MusicAd />
                            <TrendingPostAd />
                            <PosterAd />
                            <BlogAd />
                            <MobileAd />
                            <VideoAd />
                            <QuizAd />
                            <OfferAd />
                        </aside>
                    </div>
                </Container>
            </div>
        </div>
    );
}
