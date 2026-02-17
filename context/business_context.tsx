"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface MainCategory {
    category_name: string;
    permalink: string;
    children?: {
        business_category_id?: number;
        category_name: string;
        permalink: string;
    }[];
}


interface BusinessItem {
    business_id?: number;
    business_author?: string;
    business_heading?: string;
    business_slug?: string;
    business_short_description?: string;
    publish_date?: string;
    thumb_count?: number;
    business_category?: {
        business_category_name?: string;
        business_category_slug?: string;
    };
    thumbnail?:{
        file_url?: string;
    }
};

interface ContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;

    mainCategory: MainCategory | null;
    setMainCategory: (mainCategory: MainCategory) => void;

    businessData: BusinessItem[] | null;
    setBusinessData: (businessData: BusinessItem[]) => void;
}
const BusinessContext = createContext<ContextData | undefined>(undefined);
export const BusinessContextProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setLoading] = useState(true);
    const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
    const [businessData, setBusinessData] = useState<BusinessItem[] | null>(null);
    return (
        <BusinessContext.Provider
            value={{
                hasLoading, setLoading,
                mainCategory, setMainCategory,
                businessData, setBusinessData
            }}
        >
            {children}
        </BusinessContext.Provider>
    )
};

export const useBusinessContext = () : ContextData => {
    const contextContent = useContext(BusinessContext);
    if(!contextContent){
        throw new Error("BusinessContextProvider must be in layout.tsx");
    }

    return contextContent;
}