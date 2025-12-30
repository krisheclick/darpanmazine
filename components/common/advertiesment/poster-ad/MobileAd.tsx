import Image from 'next/image'
import Styles from './style.module.css'

const MobileAd = () => {
    return (
        <div className={Styles.mobileAd}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/mobile-app-ad.png`}
                    alt="Skyscraper Advertiesment Poster"
                    width={310}
                    height={550}
                    priority
                    style={{ objectFit: "contain" }}
                />
            </figure>
        </div>
    )
}

export default MobileAd
