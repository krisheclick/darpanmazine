import MobileAd from "../common/advertiesment/poster-ad/MobileAd";
import MusicAd from "../common/advertiesment/poster-ad/MusicAd";
import PopularPost from "../post/popular/Post";
import TrendingPostAd from "../common/advertiesment/poster-ad/TrendingPostAd";
import BlogAd from "../common/advertiesment/poster-ad/BlogAd";
import PosterAd from "../common/advertiesment/poster-ad/PosterAd";

import Styles from "./style.module.css";

const Sidebar = () => {
    return (
        <div className={Styles.sidebar}>
            <MobileAd />
            <MusicAd />
            <PopularPost />
            <TrendingPostAd />
            <PosterAd />
            <BlogAd />
        </div>
    )
}

export default Sidebar
