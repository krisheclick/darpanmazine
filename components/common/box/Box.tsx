import Link from "next/link";
import ImageFunctionLink from "@/utlis/ImageFunctionLink";
type Props = {
    tag?: string;
    title?: string;
    slug?: string;
    author_name?: string;
    publish_date?: string;
    backGroundImage?: boolean;
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
                <ImageFunctionLink
                    href={`${process.env.NEXT_PUBLIC_ENV_URL}${slug}`}
                    className="boxPoster"
                    src={thumbnail}
                    backGroundImage={true}
                    alt={title}
                    fallBack={errorImg}
                />
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
                {author_name ? <div className="authorName" title={author_name}>{author_name}</div> : ''}                
                <div className="publishDate">
                    <span>{formattedDate}</span> {timestring ? <span>{formattedTime}</span> : ''}
                </div>
            </div>
        </div>
    )
}
export default EventsBox;