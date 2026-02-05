"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ContextDataType = {
    otherSlider: boolean | null;
    setOtherSlider: (otherSlider: boolean) => void;
    
    article: MostArticle[] | null;
    setArticle: (article: MostArticle[]) => void;
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

const innerContext = createContext<ContextDataType | undefined>(undefined);

export const InnerLayoutProvider = ({children} : {children: ReactNode}) => {
    const [otherSlider, setOtherSlider] = useState(false);
    const [article, setArticle] = useState<MostArticle[] | null>(null);
    
    return(
        <innerContext.Provider
            value={{
                otherSlider, setOtherSlider,
                article, setArticle
            }}
        >
            {children}
        </innerContext.Provider>
    )
}

export const useLayoutContext = () : ContextDataType => {
    const blogContent = useContext(innerContext);
    if(!blogContent){
        throw new Error("useLayContext must be used within a InnerLayoutProvider on layout.tsx");
    }

    return blogContent;
}