import Link from "next/link";
import Styles from "./style.module.css";
import PostList from "./PostList";

const PostView = () => {
    return (
        <div className={Styles.area_section}>
            <div className="rj_content border-block mb-lg-4 border-another" style={{ borderBlockColor: "rgba(217, 217, 217, 1)" }}>
                <h1 className="title mb-0">Real Estate</h1>
                <div className={Styles.categoryList}>
                    <ul className="inlineList">
                        <li>
                            <Link href="#" className="active">International</Link>
                        </li>
                        <li>
                            <Link href="#">National</Link>
                        </li>
                        <li>
                            <Link href="#">Sports</Link>
                        </li>
                        <li>
                            <Link href="#">Tech</Link>
                        </li>
                        <li>
                            <Link href="#">India</Link>
                        </li>
                        <li>
                            <Link href="#">Health</Link>
                        </li>
                        <li>
                            <Link href="#">Life</Link>
                        </li>
                        <li>
                            <Link href="#">Interesting</Link>
                        </li>
                        <li>
                            <Link href="#">Election</Link>
                        </li>
                        <li>
                            <Link href="#">Real Estate</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <PostList />
        </div>
    )
}

export default PostView
