import ImageFunction from '@/utlis/ImageFunction';
import Styles from './style.module.css';

const OfferAd = () => {
    return (
        <div className={Styles.skyscraper}>
            <ImageFunction
                className={Styles.poster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/skyscraper-ad.png`}
                alt="Skyscraper Advertiesment Poster"
                width={310}
                height={550}
                style={{ objectFit: "contain" }}
            />
        </div>
    )
}

export default OfferAd
