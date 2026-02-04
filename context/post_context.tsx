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
    }[];
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

interface PostContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;
    mainCategory: MainCategory | null;
    setMainCategory: (mainCategory: MainCategory) => void;
    allPosts: Postdata[] | null;
    setAllPosts: (allPosts: Postdata[]) => void;
}

const PostContext = createContext<PostContextData | undefined>(undefined);

export const PostProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setLoading,] = useState(true);
    const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
    const [allPosts, setAllPosts] = useState<Postdata[] | null>(null);
    return(
        <PostContext.Provider
            value={{
                hasLoading, setLoading,
                mainCategory, setMainCategory,
                allPosts, setAllPosts
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