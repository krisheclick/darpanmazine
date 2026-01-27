import Styles from './style.module.css';
const VideoSkeleton = () => {
    return (
        <div className={`videoBox ${Styles.sliderBox}`}>
            <figure className={Styles.poster}>
                <div className="skeleton skeletonFill"></div>
                <span className={Styles.videoTimer}>
                    <em className='skeleton'></em> <b className='skeleton'></b> <em className='skeleton'></em>
                </span>
            </figure>
            <div className={Styles.boxContent}>
                <span className={`skeleton mb-1 ${Styles.subtitle}`}></span>
                <span className={`skeleton mb-1 ${Styles.subtitle}`}></span>
            </div>
        </div>
    )
}

export default VideoSkeleton
