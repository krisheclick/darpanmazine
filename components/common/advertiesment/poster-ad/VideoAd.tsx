import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './style.module.css';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const VideoAd = () => {
    const poster = `${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/Jacqueline-Fernandez.png`;
    return (
        <div 
            className={`${Styles.postBoxLink} ${Styles.videoBoxLink}`}
            style={{background: `url(${poster}) `}}
        >
            <div className="position-relative z-1">
                <div className={Styles.slogan}>Events</div>
                <div className={Styles.subtitle}>Lorem Ipsum is simply of the dummy text the </div>
            </div>
            <span className={Styles.videoButton}>
                <FontAwesomeIcon icon={faPlay} />
            </span>
        </div>
    )
}

export default VideoAd

