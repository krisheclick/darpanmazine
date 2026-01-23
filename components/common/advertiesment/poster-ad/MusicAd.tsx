import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';

const MusicAd = () => {
    return (
        <div className={Styles.musicAd}>
            <ImageFunction
                className={Styles.poster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/music-ad.png`}
                alt="Skyscraper Advertiesment Poster"
                width={310}
                height={550}
                style={{ objectFit: "contain" }}
            />
        </div>
    )
}

export default MusicAd
