import Image from 'next/image'
import Styles from './style.module.css'

const BlogAd = () => {
    return (
        <div className={Styles.blogAd}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/magazine-blog.png`}
                    alt="Skyscraper Advertiesment Poster"
                    width={310}
                    height={258}
                    priority
                    style={{ objectFit: "contain" }}
                />
            </figure>
        </div>
    )
}

export default BlogAd
