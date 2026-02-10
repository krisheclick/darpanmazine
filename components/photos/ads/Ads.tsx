import Styles from "@/components/sidebar/style.module.css";
import FeaturedGalleries from "./FeaturedGalleries";
import MobileAd from "@/components/common/advertiesment/poster-ad/MobileAd";
import MusicAd from "@/components/common/advertiesment/poster-ad/MusicAd";
import TrendingPostAd from "@/components/common/advertiesment/poster-ad/TrendingPostAd";
import PosterAd from "@/components/common/advertiesment/poster-ad/PosterAd";
import BlogAd from "@/components/common/advertiesment/poster-ad/BlogAd";
const PhotosAds = () => {
    return (
        <>
            <MobileAd />
            <MusicAd />
            <FeaturedGalleries />
            <TrendingPostAd />
            <PosterAd />
            <BlogAd />
        </>
    )
}

export default PhotosAds
