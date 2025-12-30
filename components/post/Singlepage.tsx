import Image from 'next/image';
import Styles from './style.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Singlepage = () => {
    return (
        <div className={Styles.single_page}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/post-banner.png`}
                    alt="Single Poster"
                    width={1247} height={742}
                    priority
                />
            </figure>
            <div className={Styles.single_content}>
                <div className={`d-flex align-items-start gap-4 ${Styles.post_share}`}>
                    <span className='mt-1'>Share in Post: </span>
                    <div className={`d-flex align-items-center flex-wrap ${Styles.social}`}>
                        <Link href="#"><FontAwesomeIcon icon={faXTwitter} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faFacebook} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faLinkedin} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faLink} /></Link>
                        <Link href="#"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                    </div>
                </div>
                <div className={Styles.tagWrap}>
                    <span>Lifestyle, </span>
                    <time dateTime="12:30px">17 December 2025</time>
                </div>
                <h1 className={Styles.pageTitle }>François Arnaud Is Hollywood’s Quiet Chameleon</h1>
                <div className={`rj_editor_text ${Styles.rj_editor_text}`}>
                    <p>With every role, the Montreal-born actor peels back a new layer—quietly becoming one of his  generation’s most intriguing talents.</p>

                    <p>François Arnaud isn’t entirely sure where he lives nowadays—or more precisely, where he belongs. The Montreal-born actor is holed up in the Laurentians, in a house he built with a friend during the pandemic, surrounded by whispering pines and the occasional deer wandering by his window. It’s where he often retreats to recharge after performing emotionally demanding roles—most recently, in German Canadian filmmaker Wiebke von Carolsfeld’s upcoming drama Someone’s Daughter, where he plays a man kidnapped along with the criminal lawyer who once defended him against a rape charge. “You feel depleted after a role like that, and you have to find ways to replenish,” he says, the autumn sun streaking the room with molten orange. “I’m glad I have my place in the woods here, but I also don’t want to live in the middle of nowhere by myself. Maybe one day, but the quiet is loud.”</p>

                    <p>Arnaud has spent recent years in Los Angeles, yet with his sights now  set on New York and a heart that still tugs him toward Quebec, “home” is a slippery notion. “It’s a weird time in my life, because I feel like  I’ve gotten to know myself more, and I know who I am. And that’s great. </p>

                    <p>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/post-1.png`}
                            alt="Single Poster"
                            width={1247} height={742}
                            priority
                        />
                        <Image
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}deleted/post-2.png`}
                            alt="Single Poster"
                            width={1247} height={742}
                            priority
                        />
                    </p>

                    <p>That tension between motion and stillness mirrors his career. Since breaking out in Quebec filmmaker Xavier Dolan’s 2009 debut J’ai tué ma mère (I Killed My Mother), Arnaud has leapt across genres, languages, and worlds—from the scheming Renaissance courts of the Showtime drama The Borgias to the eerie  streets of the NBC supernatural thriller Midnight, Texas, and now, the steamy locker rooms of Crave’s gay hockey romance Heated Rivalry. Given that range, he’s never comfortably settled into one corner of the industry, a restlessness that echoes his nomadic streak.</p>

                    <p>As a young actor, Arnaud felt the pull from south of the border, drawn  to something bigger, louder, messier than the polite restraint of  Canadian life. “In the U.S., especially the big cities, there’s  something about the extremes that’s appealing and can fuel creativity.  It’s a lot of things, but it’s not boring. It’s grittier. It’s edgier.  It’s more punk.” But having just turned 40, he admits the thrill has  dulled.</p>
                </div>

                <figure className={Styles.posterAd}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}poster-ad.jpg`}
                        alt="Poster"
                        width={770}
                        height={164}
                        priority
                    />
                </figure>
            </div>
        </div>
    )
}

export default Singlepage
