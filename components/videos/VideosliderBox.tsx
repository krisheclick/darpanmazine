import Link from 'next/link';
import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons/faPlayCircle';

type Props = {
    title?: string;
    url?: string;
    poster?: string;
    publish_date?: string;
    videoTimer?: string;
    strip?: boolean;
    className?: string;
}
const VideosliderBox = ({title, url, poster, videoTimer = "", strip = false, className=''}: Props) => {
    return (
        <Link 
            href={`${process.env.NEXT_PUBLIC_ENV_URL}${url}`} 
            className={`videoBox ${Styles.sliderBox} ${strip ? Styles.stripLine : ''} ${className ? Styles[className] : ''}`}
        >
            <div className={`position-relative ${Styles.posterWrapper ?? ''}`}>
                <ImageFunction 
                    className={Styles.poster}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    alt={title || "Video Poster"}
                />
                <span className={Styles.videoTimer}>{videoTimer}</span>
                <span className={Styles.videoIcon}>
                    <FontAwesomeIcon icon={faPlayCircle} />
                </span>
            </div>
            <div className={Styles.boxContent}>
                <div className={`subtitle ${Styles.subtitle ?? ''}`}>{title}</div>
            </div>
        </Link>
    )
}

export default VideosliderBox
