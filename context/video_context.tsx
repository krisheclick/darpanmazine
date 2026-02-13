"use client";

import { createContext, ReactNode, useContext, useState } from "react";
interface FeaturedVideoData {
    author?: string;
    heading?: string;
    permalink?: string;
    short_description?: string;
    category?: {
        category_name?: string;
        permalink?: string;
    };
    thumbnail?: {
        file_url?: string;
    }
};
interface MostVideoData {
    heading?: string;
    permalink?: string;
    short_description?: string;
    images?: {
        file_url?: string;
    }[]
};
interface VideoContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;
    adTrue: boolean;
    setadTrue: (adTrue: boolean) => void;

    featuredVideo: FeaturedVideoData[] | null;
    setFeaturedVideo: (featuredVideo: FeaturedVideoData[]) => void;

    mostVideo: MostVideoData[] | null;
    setMostVideo: (featuredVideo: MostVideoData[]) => void;
}
const VideoContext = createContext<VideoContextData | undefined>(undefined);

export const VideoContextProvider = ({children}: {children: ReactNode}) => {

    const [hasLoading, setLoading] = useState(true);
    const [adTrue, setadTrue] = useState(true);
    const [featuredVideo, setFeaturedVideo] = useState<FeaturedVideoData[] | null>(null);
    const [mostVideo, setMostVideo] = useState<MostVideoData[] | null>(null);

    return(
        <VideoContext.Provider
            value={{
                hasLoading, setLoading,
                adTrue, setadTrue,
                featuredVideo, setFeaturedVideo,
                mostVideo, setMostVideo
            }}
        >
            {children}
        </VideoContext.Provider>
    )
}

export const useVideosContext = () : VideoContextData => {
    const content = useContext(VideoContext);
    if(!content){
        throw new Error("Layout children must be use VideosContextProvider");
    }

    return content;
}