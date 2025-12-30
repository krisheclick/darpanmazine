import Image from 'next/image'
import Styles from './style.module.css'

const PosterAd = () => {
    return (
        <div className={Styles.posterAd}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/vitamin.png`}
                    alt="Skyscraper Advertiesment Poster"
                    width={310}
                    height={250}
                    priority
                    style={{ objectFit: "contain" }}
                />
            </figure>
        </div>
    )
}

export default PosterAd
