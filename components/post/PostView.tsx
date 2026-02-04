"use client";
import Link from "next/link";
import Styles from "./style.module.css";
import PostList from "./PostList";
import { usePostContext } from "@/context/post_context";
import { usePathname } from "next/navigation";

const PostView = () => {
    const { hasLoading, mainCategory } = usePostContext();
    const pathName = usePathname();

    return (
        <div className={Styles.area_section}>
            <div className="rj_content border-block mb-lg-4 border-another" style={{ borderBlockColor: "rgba(217, 217, 217, 1)" }}>
                {!hasLoading ? (
                    <h1 className="title mb-0">{mainCategory?.categoryName} </h1>
                ) : (
                    <h1 className="skeleton title mb-0"> </h1>
                )}
                <div className={Styles.categoryList}>
                    <ul className="inlineList">
                        {!hasLoading && mainCategory?.children ? (
                            mainCategory?.children?.map((value, index) => {
                                const isActive = pathName === `/${mainCategory?.permalink}/${value?.permalink}` || (pathName.startsWith(`${value.permalink}`) && pathName !== "/");
                                return (
                                    <li key={index}>
                                        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/${mainCategory?.permalink}/${value?.permalink}`} className={isActive ? "active" : ""}>{value?.categoryName}</Link>
                                    </li>
                                )
                            })
                        ) : (
                            [...Array(6)].map((_, index) => (
                                <li key={index} className={`skeleton ${Styles.skeletonPill}`}></li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <PostList />
        </div>
    )
}

export default PostView
