import Styles from "./style.module.css";
import Image from "next/image";

const QuizAd = () => {
    return (
        <div className={Styles.quizAdBox}>
            <figure className={Styles.poster}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/quiz-ad.png`}
                    alt="Advertiesment Poster"
                    width={280} height={280}
                    priority
                    style={{objectFit: "contain"}}
                />
            </figure>
        </div>
    )
}

export default QuizAd
