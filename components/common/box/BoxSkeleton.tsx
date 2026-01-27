
const BoxSkeleton = () => {
    return (
        <div className="eventsBox skeltetonBox">
            <div className="eventsBox-top">
                <div className="boxPoster skeleton"></div>
                <div className="eventsBox-text">
                    <span className="boxTag skeleton"></span>
                    <div className="subtitle skeleton mb-2"></div>
                    <div className="subtitle skeleton w-75"></div>
                </div>
            </div>
            <div className="eventsBox-end gap-2">
                <div className="authorName skeleton w-50"></div>
                <div className="publishDate skeleton w-50"></div>
            </div>
        </div>
    )
}

export default BoxSkeleton
