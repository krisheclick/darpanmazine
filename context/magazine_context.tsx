"use client";
interface CategoryItem {
    category_name?: string;
    slug?: string;
}
interface MainCategory {
    category_name?: string;
    permalink?: string;
    children?: CategoryItem[] | undefined;
}
interface MagazineContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;

    categoryData: MainCategory | null;
    setMaincategory: (categoryData: MainCategory) => void;
}
import { createContext, ReactNode, useContext, useState } from "react";

const MagazineContext = createContext<MagazineContextData | undefined>(undefined);

export const MagazineProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setLoading] = useState(true);
    const [categoryData, setMaincategory] = useState<MainCategory | null>(null);
    return(
        <MagazineContext.Provider
            value={{
                hasLoading, setLoading,
                categoryData, setMaincategory
            }}
        >
            {children}
        </MagazineContext.Provider>
    )
}

export const useMagazineContext = () : MagazineContextData => {
    const magazine_content = useContext(MagazineContext);
    if(!magazine_content){
        throw new Error("MagazineContext must be used within an MagazineProvider");
    }
    return magazine_content;
}