import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';

const PosterAd = () => {
    return (
        <div className={Styles.posterAd}>
            <ImageFunction
                className={Styles.poster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/vitamin.png`}
                alt="Skyscraper Advertiesment Poster"
                width={310}
                height={250}
                style={{ objectFit: "contain" }}
            />
        </div>
    )
}

export default PosterAd
