import MobileAd from "@/components/common/advertiesment/poster-ad/MobileAd";
import MusicAd from "@/components/common/advertiesment/poster-ad/MusicAd";
import TrendingPostAd from "@/components/common/advertiesment/poster-ad/TrendingPostAd";
import FeaturedVideoGalleries from "./FeaturedGalleries";
const VideosAds = () => {
    return (
        <>
            <MobileAd />
            <MusicAd />
            <FeaturedVideoGalleries />
            <TrendingPostAd />
        </>
    )
}

export default VideosAds
