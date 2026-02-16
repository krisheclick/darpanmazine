"use client";
import Link from 'next/link';
import Styles from './style.module.css';
import { usePostContext } from '@/context/post_context';
import ImageFunction from '@/utlis/ImageFunction';

const PopularPost = () => {
    const { mostReadArticle } = usePostContext();
    const dateFormat = (dateObj: Date)=>{
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
            month: "short",
            day: "2-digit",
        }) + ', ' + dateObj.getFullYear();

        // const formattedTime = dateObj.toLocaleTimeString("en-US", {
        //     hour: "2-digit",
        //     minute: "2-digit",
        //     hour12: true
        // });
        return `<span> ${formattedDate}</span>`
    }
    return (
        <div className={Styles.popular_post}>
            <div className={Styles.bar_title}>Most Popular</div>
            <div className={Styles.list}>
                {mostReadArticle ? (
                    <ul className='noList'>
                        {mostReadArticle.slice(0,6).map((value, index) => (
                            <li key={index}>
                                <Link href={`${value.permalink}`} className={Styles.box}>
                                    <ImageFunction
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.images?.file_url}`}
                                        alt={value.heading || "Thumbnail poster"}
                                    />
                                    <div className={Styles.content}>
                                        <div className={Styles.title}>{value.heading}</div>
                                        {value.publish_date && (
                                            <div className={Styles.postDate}
                                                dangerouslySetInnerHTML={{ __html: dateFormat(new Date(value?.publish_date?? '')) }}
                                            />
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default PopularPost
