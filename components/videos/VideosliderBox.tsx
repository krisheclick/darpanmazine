import Link from 'next/link';
import Image from 'next/image';
import Styles from './style.module.css';

type Props = {
    title?: string;
    url?: string;
    image_dir?: string;
    poster?: string;
    publish_date?: string;
    videoTimer?: string;
}
const VideosliderBox = ({title, url, image_dir, poster, videoTimer}: Props) => {
    return (
        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}${url}`} className={`videoBox ${Styles.sliderBox}`}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/library/uploads${image_dir}${poster}.jpg`}
                    alt={title || "Video Poster"}
                    fill
                    priority
                />
                <span className={Styles.videoTimer}>{videoTimer}</span>
            </figure>
            <div className={Styles.boxContent}>
                <div className={Styles.subtitle}>{title}</div>
            </div>
        </Link>
    )
}

export default VideosliderBox
