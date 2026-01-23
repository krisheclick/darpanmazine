import Link from "next/link";
import Styles from "./style.module.css";
import ImageFunction from "@/utlis/ImageFunction";
const Homebannerad = () => {
    return (
        <div className={Styles.bannerAdBox}>
            <ImageFunction
                className={Styles.bannerAdPoster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/sonakshi.jpg`}
                alt="Sonakshi"
            />
            <div className={Styles.bannerAdContent}>
                <div className={Styles.bannerAdTitle}>September / October 2025</div>
                <p>Lorem Ipsum is simply dummy text the printing and typesetting industry.</p>
                <div className={`d-flex flex-column gap-2 ${Styles.bannerAdBtn}`}>
                    <Link href="#" className="rj-btn-digital specialButton">Digital Edition Here</Link>
                    <Link href="#" className={`rj-btn-doorstep white-btn ${Styles.doorstepBtn}`}>Get DARPAN at Your Doorstep</Link>
                </div>
            </div>
        </div>
    )
}

export default Homebannerad
