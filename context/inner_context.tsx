"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ContextDataType = {
    otherSlider: boolean | null;
    setOtherSlider: (otherSlider: boolean) => void;
}

const innerContext = createContext<ContextDataType | undefined>(undefined);

export const InnerLayoutProvider = ({children} : {children: ReactNode}) => {
    const [otherSlider, setOtherSlider] = useState(false);
    
    return(
        <innerContext.Provider
            value={{otherSlider, setOtherSlider}}
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