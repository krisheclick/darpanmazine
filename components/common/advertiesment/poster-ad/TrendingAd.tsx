import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';

const TrendingAd = () => {
    return (
        <div>
            <ImageFunction
                className={Styles.poster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/poster-ad.png`}
                alt="Advertiestment Poster"
                width={310} height={550}
            />
        </div>
    )
}

export default TrendingAd
