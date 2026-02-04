import ImageFunction from "@/utlis/ImageFunction";
import Sliderbanner from "../common/banner/Sliderbanner";
import PostView from "./PostView";
import PostList from "./PostList";
import Singlepage from "./Singlepage";

type PageProps = {
    checkCategory?: boolean
    slug?: string[] | string;
}
const PostPageComponent = ({checkCategory, slug}: PageProps) => {
    return(
        checkCategory ? (
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
        ) : (
            <Singlepage />
        )
    )
}

export default PostPageComponent;