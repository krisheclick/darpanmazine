"use client";
import Styles from "@/components/post/style.module.css";
import { useBusinessContext } from "@/context/business_context";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BusinessCategory = () => {
    const {hasLoading, mainCategory} = useBusinessContext();
    const pathName = usePathname();
    return (
        <div className={Styles.area_section}>
            <div className="rj_content border-block mb-lg-4 border-another" style={{ borderBlockColor: "rgba(217, 217, 217, 1)" }}>
                {!hasLoading ? (
                    <h1 className="title mb-0">{mainCategory?.category_name} </h1>
                ) : (
                    <h1 className="skeleton title mb-0"> </h1>
                )}
                <div className={Styles.categoryList}>
                    <ul className="inlineList">
                        {!hasLoading && mainCategory?.children ? (
                            mainCategory?.children?.map((value, index) => {
                                const isActive = pathName === `/${mainCategory?.permalink}/${value?.permalink}` || (pathName.startsWith(`${value?.permalink}`) && pathName !== "/");
                                return (
                                    <li key={index}>
                                        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/${mainCategory?.permalink}/${value?.permalink}`} className={isActive ? "active" : ""}>{value?.category_name}</Link>
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

export default BusinessCategory
