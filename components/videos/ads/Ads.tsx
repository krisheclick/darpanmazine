"use client";
import MobileAd from "@/components/common/advertiesment/poster-ad/MobileAd";
import MusicAd from "@/components/common/advertiesment/poster-ad/MusicAd";
import TrendingPostAd from "@/components/common/advertiesment/poster-ad/TrendingPostAd";
import FeaturedVideoGalleries from "./FeaturedGalleries";
import PosterAd from "@/components/common/advertiesment/poster-ad/PosterAd";
import BlogAd from "@/components/common/advertiesment/poster-ad/BlogAd";
import { useVideosContext } from "@/context/video_context";
const VideosAds = () => {
    const { adTrue } = useVideosContext();
    return (
        <>
            <MobileAd />
            <MusicAd />
            <FeaturedVideoGalleries />
            <TrendingPostAd />
            {adTrue && (
                <>
                    <PosterAd />
                    <BlogAd />
                </>
            )}
        </>
    )
}

export default VideosAds
