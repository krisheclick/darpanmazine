type Props = {
    tag?: boolean;
}
const PhotoBoxSkeleton = ({tag = false} : Props) => {

    return (
        <div className="photoBox">
            <figure className="boxPoster">
                <div className="skeleton skeletonFill"></div>
                {tag ? <span className="skeleton w-25 skeletonText"></span> : ''}
            </figure>
            <div className="photoBoxText">
                <div className="skeleton skeletonText w-100 mb-1"></div>
                <div className="skeleton skeletonText w-75"></div>
            </div>
        </div>
    )
}

export default PhotoBoxSkeleton
