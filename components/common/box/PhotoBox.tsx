import Image from "next/image";
import Link from "next/link";

type Props = {
    tag?: string;
    title?: string;
    slug?: string;
    thumbnail?: string;
}
const PhotoBox = ({tag, title, slug, thumbnail} : Props) => {

    return (
        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}${slug}`} className="photoBox">
            <figure className="boxPoster">
                <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${thumbnail}` || `${process.env.NEXT_PUBLIC_ENV_URL}assets/images/deleted/tamanna_punjabi_kapoora’s.png`}
                    alt={title || "Poster Title"}
                    fill
                    priority
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/poster-woman.png`;
                    }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
                {tag ? <span className="photoTag">{tag}</span> : ''}
            </figure>
            <div className="photoBoxText">
                <div className="subheading">{title}</div>
            </div>
        </Link>
    )
}

export default PhotoBox
