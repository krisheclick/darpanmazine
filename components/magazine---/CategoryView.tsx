"use client";
import Link from "next/link";
import Styles from "@/components/post/style.module.css";
import { usePathname } from "next/navigation";
import { useMagazineContext } from "@/context/magazine_context";

const CategoryView = () => {
    const { hasLoading, categoryData } = useMagazineContext();
    const pathName = usePathname();

    return (
        <div className={Styles.area_section}>
            <div className="rj_content border-block mb-lg-4 border-another" style={{ borderBlockColor: "rgba(217, 217, 217, 1)" }}>
                {!hasLoading ? (
                    <h1 className="title mb-0">{categoryData?.category_name} </h1>
                ) : (
                    <h1 className="skeleton title mb-0"> </h1>
                )}
                <div className={Styles.categoryList}>
                    <ul className="inlineList">
                        {!hasLoading && categoryData?.children ? (
                            categoryData?.children?.map((value, index) => {
                                const isActive = pathName === `/${categoryData?.permalink}/${value?.slug}` || (pathName.startsWith(`${value?.slug}`) && pathName !== "/");
                                return (
                                    <li key={index}>
                                        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/${categoryData?.permalink}/${value?.slug}`} className={isActive ? "active" : ""}>{value?.category_name}</Link>
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
        </div>
    )
}

export default CategoryView;
