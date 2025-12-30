import Link from "next/link";
import Image from "next/image";
type Props = {
    tag?: string;
    title?: string;
    slug?: string;
    author_name?: string;
    publish_date?: string;
    thumbnail?: string;
    errorImg?: string;
    timestring?: boolean | false;
}
const EventsBox = ({tag, title, slug, author_name, publish_date, thumbnail, errorImg, timestring} : Props) => {
    const dateObj = new Date(publish_date ?? '');
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
    })+ ', '+ dateObj.getFullYear();

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
    
    return(
        <div className="eventsBox">
            <div className="eventsBox-top">
                <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}${slug}`} className="boxPoster">
                    <Image
                        src={thumbnail || `${process.env.NEXT_PUBLIC_ENV_URL}assets/images/deleted/tamanna_punjabi_kapoora’s.png`}
                        alt={title || "Poster Title"}
                        fill
                        priority
                        // onError={(e) => {
                        //     (e.target as HTMLImageElement).src =
                        //         `${process.env.NEXT_PUBLIC_ASSET_PREFIX}no-image.jpg`;
                        // }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                errorImg ? errorImg : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/no-image.jpg`;
                        }}
                        sizes="(max-width: 768px) 100vw, 25vw"
                    />
                </Link>
                <div className="eventsBox-text">
                    {tag ? <span className="boxTag">{tag}</span> : ''}
                    <Link 
                        href={`${process.env.NEXT_PUBLIC_ENV_URL}${slug}`}
                        className="subtitle"
                        dangerouslySetInnerHTML={{ __html: title ?? '' }}
                    />
                </div>
            </div>
            <div className="eventsBox-end">
                {author_name ? <div className="authorName">{author_name}</div> : ''}                
                <div className="publishDate">
                    <span>{formattedDate}</span> {timestring ? <span>{formattedTime}</span> : ''}
                </div>
            </div>
        </div>
    )
}
export default EventsBox;