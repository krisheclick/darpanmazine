"use client";
import Link from 'next/link';
import Styles from './style.module.css';
import { usePostContext } from '@/context/post_context';
import ImageFunction from '@/utlis/ImageFunction';

const PopularPost = () => {
    const { mostReadArticle } = usePostContext();
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
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.images?.[0]?.file_url}`}
                                        alt={value.heading || "Thumbnail poster"}
                                    />
                                    <div className={Styles.content}>
                                        <div className={Styles.title}>{value.heading}</div>
                                        <div className={Styles.postDate}>16 December 2025</div>
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
