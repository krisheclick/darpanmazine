import Image from 'next/image'
import Styles from './style.module.css'

const TrendingAd = () => {
    return (
        <div>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/poster-ad.png`}
                    alt="Advertiestment Poster"
                    width={310} height={550}
                    priority
                />
            </figure>
        </div>
    )
}

export default TrendingAd
