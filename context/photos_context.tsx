"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface FeaturedItem {
    photo_heading?: string;
    photo_slug?: string;
    photo_image_dir?: string;
    thumb_count?: number;
    photo_category?: {
        photo_category_name?: string;
        photo_category_slug?: string;
    };
    thumbnail?: {
        file_url?: string;
    };
}
interface PhotosContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;

    featuredData: FeaturedItem[] | null;
    setFeaturedData: (featuredData: FeaturedItem[]) => void;
    mostViewed: FeaturedItem[] | null;
    setMostViewed: (mostViewed: FeaturedItem[]) => void;

}
const PhotosContext = createContext<PhotosContextData | undefined>(undefined);
export const PhotosContextProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setLoading] = useState(true);
    const [featuredData, setFeaturedData] = useState<FeaturedItem[] | null>(null);
    const [mostViewed, setMostViewed] = useState<FeaturedItem[] | null>(null);
    return(
        <PhotosContext.Provider
            value={{
                hasLoading, setLoading,
                featuredData, setFeaturedData,
                mostViewed, setMostViewed,
            }}
        >
            {children}
        </PhotosContext.Provider>
    )
}

export const usePhotosContext = () : PhotosContextData => {
    const content = useContext(PhotosContext);
    if(!content){
        throw new Error("Layout children must be use PhotosContextProvider");
    }

    return content;
}