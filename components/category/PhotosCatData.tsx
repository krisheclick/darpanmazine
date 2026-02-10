"use client";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "./style.module.css";
import { usePathname } from "next/navigation";

type CategoryItem = {
    photo_category_name?: string;
    photo_category_slug?: string;
    children?: CategoryItem[] | null;
};

const PhotosCatData = () => {
    const pathName = usePathname();
    const [hasLoading, setLoading] = useState(true);
    const [data, setData] = useState<CategoryItem[] | null>(null);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/category`);
            const { response_data } = await response.json();
            setData(response_data);
        } catch (err: unknown) {
            console.log('Photos Category Data fetch is somrthinf wrong: ', (err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={Styles.wrapper}>
            <Container>
                <ul className="d-flex flex-wrap noList">
                    {
                        !hasLoading && data ? (
                            data.map((value, index) => {
                                const isActive = pathName === `/photos/${value.photo_category_slug}` || (pathName.startsWith(`/photos/${value.photo_category_slug}`) && pathName !=='');
                                return (
                                    <li key={index} className={isActive ? Styles.isActive : ''}>
                                        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/photos/${value?.photo_category_slug}`} className={Styles.link}>
                                            {value?.photo_category_name}
                                        </Link>
                                    </li>
                                )
                            })
                        ) : (
                            [...Array(6)].map((_, index) => (
                                <li key={index} className={`skeleton ${Styles.link} ${Styles.skeletonlink}`}></li>
                            ))
                        )
                    }
                </ul>
            </Container>
        </div>
    )
}

export default PhotosCatData;