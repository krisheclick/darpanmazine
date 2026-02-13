"use client";
import { useEffect, useState } from "react";
import MagazineBanner from "./Banner";
import Styles from "./style.module.css";
import { usePostContext } from "@/context/post_context";
import NotFoundPage from "@/app/notFound";
interface slugProps {
    catgoryCheck?: boolean;
    slug?: string[];
}
const MagazineList = ({catgoryCheck = false, slug = []}: slugProps) => {
    const full_url = [...slug].join('/');
    const {setLoading, setBanner} = usePostContext();
    const [notFound, setNotFound] = useState(false);
    const fetchData = async() => {
        try{
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${catgoryCheck ? `magazines/category/${full_url}/magazines`: 'magazines'}`,
                {cache: "no-store"}
            );
            const {response_data, response_code} = await response.json();

            if(!response_code){
                setNotFound(true)
            }

            setBanner(response_data?.is_featured);
            
        }catch(err: unknown){
            console.log('API data is something wrong: ', (err as Error).message)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(notFound){
        return <NotFoundPage />
    }
    return(
        <div className={Styles.listPage}>
            <MagazineBanner />
        </div>
    )
}

export default MagazineList;