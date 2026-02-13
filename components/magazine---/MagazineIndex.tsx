"use client";
import Sliderbanner from '@/components/common/banner/Sliderbanner';
import Styles from './style.module.css';
import { usePostContext } from '@/context/post_context';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMagazineContext } from '@/context/magazine_context';
import CategoryView from './CategoryView';

const MagazineIndex = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const {setLoading, setAllPosts, setBanner} = usePostContext();
    const {setLoading:postsetLoading, setMaincategory} = useMagazineContext();

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPages, setTotalPages] = useState(1);

    const fetchdData = async(page: number) => {
        try{
            setLoading(true);
            postsetLoading(true);

            // Fetch categories
            const catRes = await fetch(`${API_URL}/magazines/category/`, { cache: "no-store" });
            const { response_data: categories } = await catRes.json();
            setMaincategory({
                category_name: "Magazine",
                permalink: "magazine",
                children: categories ?? [],
            });
        }catch(err: unknown){
            console.log('Magazine Api is something wrong: ', (err as Error).message)

        }finally{
            setLoading(false);
            postsetLoading(false);
        }
    }

    useEffect(() => {
        fetchdData(page);
    }, [page]);
    return (
        <>
            <Sliderbanner />
            <CategoryView />
        </>
    )
}

export default MagazineIndex
