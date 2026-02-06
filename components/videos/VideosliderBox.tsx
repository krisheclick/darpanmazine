import Link from 'next/link';
import Image from 'next/image';
import Styles from './style.module.css';

type Props = {
    title?: string;
    url?: string;
    poster?: string;
    publish_date?: string;
    videoTimer?: string;
}
const VideosliderBox = ({title, url, poster, videoTimer}: Props) => {
    return (
        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}${url}`} className={`videoBox ${Styles.sliderBox}`}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    alt={title || "Video Poster"}
                    fill
                    priority
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src=`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/Jacqueline-Fernandez.png`
                    }}
                />
                <span className={Styles.videoTimer}>{videoTimer || '0:00'}</span>
            </figure>
            <div className={Styles.boxContent}>
                <div className={Styles.subtitle}>{title}</div>
            </div>
        </Link>
    )
}

export default VideosliderBox
