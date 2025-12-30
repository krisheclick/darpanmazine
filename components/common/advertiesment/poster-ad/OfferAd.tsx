import Image from 'next/image'
import Styles from './style.module.css'

const OfferAd = () => {
    return (
        <div className={Styles.skyscraper}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/skyscraper-ad.png`}
                    alt="Skyscraper Advertiesment Poster"
                    width={310}
                    height={550}
                    priority
                    style={{objectFit: "contain"}}
                />
            </figure>
        </div>
    )
}

export default OfferAd
