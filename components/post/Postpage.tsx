"use client";
import ImageFunction from "@/utlis/ImageFunction";
import Sliderbanner from "../common/banner/Sliderbanner";
import PostView from "./PostView";
import PostList from "./PostList";
import Singlepage from "./Singlepage";
import { usePostContext } from "@/context/post_context";
import { useEffect, useState } from "react";
import NotFoundPage from "@/app/notFound";

type PageProps = {
    checkCategory?: boolean
    slug: string[];
}
const PostPageComponent = ({checkCategory= false, slug}: PageProps) => {
    const [notFound, setNotFoundPage] = useState(false);
    const {setLoading, setMainCategory, setAllPosts} = usePostContext();
    // const current_url = slug[slug.length - 1];
    // const [current_url, ...urlArray] = [...slug].reverse();
    // console.log(slug, current_url, urlArray, 'slug------------------');
    // const parentCategory = urlArray.length > 0 ? urlArray.reverse().join('/') : current_url;

    const reversed = [...slug].reverse();
    const current_url = reversed[0];
    const urlArray = reversed.slice(1);
    const parentCategory = urlArray.length > 0 ? [...urlArray].reverse().join("/") : current_url;
    const postUrl = urlArray.length > 0 ? [...slug].join('/') : current_url;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchCategory = async() => {
        try{
            const response = await fetch(`${API_URL}/category/${parentCategory}/`, {cache: "no-store"});
            const {response_data: category_data} = await response.json();
            setMainCategory(category_data);

            //Posts
            const postResponse = await fetch(`${API_URL}/category/${postUrl}/posts?page=1&limit=30`);
            const {response_data, response_code} = await postResponse.json();
            if(!response_code){
                setNotFoundPage(true);
            }
            setAllPosts(response_data);
        }catch(err: unknown){
            console.log('Category API is something wrong: ', (err as Error).message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    if (!checkCategory) {
        return <Singlepage url={[...slug]} />;
    }else {
        
    }

    if (notFound) {
        return <NotFoundPage />
    }
    
    return(
        <>
            <Sliderbanner />
            <PostView />
            {/* <ImageFunction
                className="poster-ad-inner"
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}assets/images/poster-ad.jpg`}
                alt="Poster"
                width={770}
                height={164}
            /> */}
            <PostList />
        </>
    )
}

export default PostPageComponent;