import ImageFunction from "@/utlis/ImageFunction";
import Styles from "./style.module.css";

const QuizAd = () => {
    return (
        <div className={Styles.quizAdBox}>
            <ImageFunction
                className={Styles.poster}
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/deleted/quiz-ad.png`}
                alt="Advertiesment Poster"
                width={280} height={280}
                style={{ objectFit: "contain" }}
            />
        </div>
    )
}

export default QuizAd
