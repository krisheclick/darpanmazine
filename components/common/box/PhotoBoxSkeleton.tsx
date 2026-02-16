type Props = {
    tag?: boolean;
    text?: boolean;
}
const PhotoBoxSkeleton = ({tag = false, text = false} : Props) => {

    return (
        <div className="photoBox">
            <figure className="boxPoster">
                <div className="skeleton skeletonFill"></div>
                {tag ? <span className="skeleton w-25 skeletonText"></span> : ''}
            </figure>
            {text && (
                <div className="photoBoxText">
                    <div className="skeleton skeletonText w-100 mb-1"></div>
                    <div className="skeleton skeletonText w-75"></div>
                </div>
            )}
        </div>
    )
}

export default PhotoBoxSkeleton
