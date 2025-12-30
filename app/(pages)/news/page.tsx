import Sliderbanner from "@/components/common/banner/Sliderbanner"
import PostList from "@/components/post/PostList"
import PostView from "@/components/post/PostView"
import Image from "next/image"

const NewsPage = () => {
    return (
        <>
            <Sliderbanner />
            <PostView />
            <figure className="poster-ad-inner">
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX ?? ''}poster-ad.jpg`}
                    alt="Poster"
                    width={770}
                    height={164}
                    priority
                />
            </figure>
            <PostList />
        </>
    )
}

export default NewsPage
