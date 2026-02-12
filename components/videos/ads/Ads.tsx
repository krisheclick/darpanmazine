import MobileAd from "@/components/common/advertiesment/poster-ad/MobileAd";
import MusicAd from "@/components/common/advertiesment/poster-ad/MusicAd";
import TrendingPostAd from "@/components/common/advertiesment/poster-ad/TrendingPostAd";
import PosterAd from "@/components/common/advertiesment/poster-ad/PosterAd";
import BlogAd from "@/components/common/advertiesment/poster-ad/BlogAd";
import FeaturedVideoGalleries from "./FeaturedGalleries";
const VideosAds = () => {
    return (
        <>
            <MobileAd />
            <MusicAd />
            <FeaturedVideoGalleries />
            <TrendingPostAd />
            <PosterAd />
            <BlogAd />
        </>
    )
}

export default VideosAds
