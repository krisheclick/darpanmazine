"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface MainCategory {
    categoryName?: string;
    permalink?: string;
    imageDir?: string;
    children?: {
        categoryName?: string;
        permalink?: string;
        imageDir?: string;
    }[] | undefined;
}

interface Postdata {
    heading?: string;
    permalink?: string;
    shortDescription?: string;
    publishDate?: string;
    categoryview?: {
        categoryName?: string;
        slug?: string;
    }
    thumbnail?: {
        file_name?: string;
        file_url?: string;
    }
}

interface MostReadArticle {
    heading?: string;
    permalink?: string;
    categoryview?: {
        categoryName?: string;
        slug?: string;
        imageDir?: string;
    };
    images?: {
        file_url?: string;
    }[];
}
interface MostArticle {
    heading?: string;
    permalink?: string;
    shortDescription?: string;
    publishDate?: string;
    images?: {
        file_url?: string;
    }[];
}
interface Categoryview  {
    categoryName?: string;
    slug?: string;
    imageDir?: string;
}
interface PostContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;
    mainCategory: MainCategory | null;
    setMainCategory: (mainCategory: MainCategory) => void;
    allPosts: Postdata[] | null;
    setAllPosts: (allPosts: Postdata[]) => void;

    mostReadArticle: MostReadArticle[] | null;
    setReadMostArticle: (mostReadArticle: MostReadArticle[]) => void;
    latestArticle: MostReadArticle[] | null;
    setLatestArticle: (latestArticle: MostReadArticle[]) => void;
    article: MostArticle[] | null;
    setArticle: (article: MostArticle[]) => void;
    postCategory: Categoryview | null;
    setPostCategory: (postCategory: Categoryview) => void;

    // Other Slider
    otherSlider: boolean | null;
    setOtherSlider: (otherSlider: boolean) => void;
}

const PostContext = createContext<PostContextData | undefined>(undefined);

export const PostProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setLoading,] = useState(true);
    const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
    const [allPosts, setAllPosts] = useState<Postdata[] | null>(null);
    const [mostReadArticle, setReadMostArticle] = useState<MostReadArticle[] | null>(null);
    const [latestArticle, setLatestArticle] = useState<MostReadArticle[] | null>(null);
    const [article, setArticle] = useState<MostArticle[] | null>(null);
    const [postCategory, setPostCategory] = useState<Categoryview | null>(null);
    const [otherSlider, setOtherSlider] = useState(false);
    return(
        <PostContext.Provider
            value={{
                hasLoading, setLoading,
                mainCategory, setMainCategory,
                allPosts, setAllPosts,
                mostReadArticle, setReadMostArticle,
                latestArticle, setLatestArticle,
                otherSlider, setOtherSlider,
                article, setArticle,
                postCategory, setPostCategory
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

export const usePostContext = (): PostContextData => {
    const context = useContext(PostContext);
    if(!context){
        throw new Error("PostContextType must be used within a PostProvider");
    }

    return context;
}