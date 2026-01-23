import Sliderbanner from "@/components/common/banner/Sliderbanner";
import PostList from "@/components/post/PostList";
import PostView from "@/components/post/PostView";
import ImageFunction from "@/utlis/ImageFunction";

const NewsPage = () => {
    return (
        <>
            <Sliderbanner />
            <PostView />
            <ImageFunction
                className="poster-ad-inner"
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/poster-ad.jpg`}
                alt="Poster"
                width={770}
                height={164}
            />
            <PostList />
        </>
    )
}

export default NewsPage
