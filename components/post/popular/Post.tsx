import Link from 'next/link';
import Image from "next/image";
import Styles from './style.module.css';

const PopularPost = () => {
    return (
        <div className={Styles.popular_post}>
            <div className={Styles.bar_title}>Most Popular</div>
            <div className={Styles.list}>
                <ul className='noList'>
                    <li>
                        <Link href="#" className={Styles.box}>
                            <figure className={Styles.poster}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/popular/ott.png`}
                                    alt="Thumbnail poster"
                                    fill
                                    priority
                                />
                            </figure>
                            <div className={Styles.content}>
                                <div className={Styles.title}>15 best Indian OTT shows of 2025 that kept us in bed all weekend, according to</div>
                                <div className={Styles.postDate}>16 December 2025</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className={Styles.box}>
                            <figure className={Styles.poster}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/popular/glammer.png`}
                                    alt="Thumbnail poster"
                                    fill
                                    priority
                                />
                            </figure>
                            <div className={Styles.content}>
                                <div className={Styles.title}>This year’s most googled astrology questions, answered</div>
                                <div className={Styles.postDate}>16 December 2025</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className={Styles.box}>
                            <figure className={Styles.poster}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/popular/dig-deep.png`}
                                    alt="Thumbnail poster"
                                    fill
                                    priority
                                />
                            </figure>
                            <div className={Styles.content}>
                                <div className={Styles.title}>235 best “Never Have I Ever” questions that dig deep</div>
                                <div className={Styles.postDate}>16 December 2025</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className={Styles.box}>
                            <figure className={Styles.poster}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/popular/design.png`}
                                    alt="Thumbnail poster"
                                    fill
                                    priority
                                />
                            </figure>
                            <div className={Styles.content}>
                                <div className={Styles.title}>A look at the brands present at the AD Design Show 2025 in Hyderabad</div>
                                <div className={Styles.postDate}>16 December 2025</div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PopularPost
