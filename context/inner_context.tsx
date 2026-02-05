"use client";

import { createContext, ReactNode, useContext, useState } from "react";

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
type ContextDataType = {
    otherSlider: boolean | null;
    setOtherSlider: (otherSlider: boolean) => void;

    article: MostArticle[] | null;
    setArticle: (article: MostArticle[]) => void;

    postCategory: Categoryview | null;
    setPostCategory: (postCategory: Categoryview) => void;
}

const innerContext = createContext<ContextDataType | undefined>(undefined);

export const InnerLayoutProvider = ({children} : {children: ReactNode}) => {
    const [otherSlider, setOtherSlider] = useState(false);
    const [article, setArticle] = useState<MostArticle[] | null>(null);
    const [postCategory, setPostCategory] = useState<Categoryview | null>(null);
    
    return(
        <innerContext.Provider
            value={{
                otherSlider, setOtherSlider,
                article, setArticle,
                postCategory, setPostCategory
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