import Link from 'next/link';
import Styles from './style.module.css';

const TrendingPostAd = () => {
    const poster = `${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/hartal.png`;
    return (
        <Link 
            href="#" 
            className={Styles.postBoxLink}
            style={{background: `url(${poster})`}}
        >
            <div className="position-relative z-1">
                <div className={Styles.slogan}>Punjabi</div>
                <div className={Styles.subtitle}>Lorem Ipsum is simply of the dummy text the </div>
            </div>
        </Link>
    )
}

export default TrendingPostAd
