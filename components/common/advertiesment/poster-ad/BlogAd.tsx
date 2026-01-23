import Styles from './style.module.css';
import ImageFunction from '@/utlis/ImageFunction';

const BlogAd = () => {
    return (
        <div className={Styles.blogAd}>
            <ImageFunction
                className={Styles.poster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/magazine-blog.png`}
                alt="Skyscraper Advertiesment Poster"
                width={310}
                height={258}
                style={{ objectFit: "contain" }}
            />
        </div>
    )
}

export default BlogAd
