"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface MainCategory {
    category_name?: string;
    permalink?: string;
    children?: {
        category_name?: string;
        permalink?: string;
    }[] | undefined;
}

interface EventData {
    heading?: string;
    permalink?: string;
    short_description?: string;
    publish_date?: string;
    category?: {
        category_name?: string;
        permalink?: string;
    }
    thumbnail?: {
        file_name?: string;
        file_url?: string;
    }
}

interface MostReadArticle {
    heading?: string;
    permalink?: string;
    category?: {
        category_name?: string;
        permalink?: string;
        imageDir?: string;
    };
    images?: {
        file_url?: string;
    };
}

interface BannerItem {
    author?: string;
    heading?: string;
    permalink?: string;
    short_description?: string;
    publish_date?: string;
    category?: {
        category_name?: string;
        permalink?: string;
        imageDir?: string;
    };
    thumbnail?: {
        file_url?: string;
    };
}

interface EventsContextData {
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;
    mainCategory: MainCategory | null;
    setMainCategory: (mainCategory: MainCategory) => void;
    allEvents: EventData[] | null;
    setAllEvents: (allEvents: EventData[]) => void;

    mostReadArticle: MostReadArticle[] | null;
    setReadMostArticle: (mostReadArticle: MostReadArticle[]) => void;
    banner: BannerItem[] | null;
    setBanner: (banner: BannerItem[]) => void;
}

const EventsContext = createContext<EventsContextData | undefined>(undefined);

export const EventsProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setLoading] = useState(true);
    const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
    const [allEvents, setAllEvents] = useState<EventData[] | null>(null);
    const [mostReadArticle, setReadMostArticle] = useState<MostReadArticle[] | null>(null);
    const [banner, setBanner] = useState<BannerItem[] | null>(null);

    return(
        <EventsContext.Provider
            value={{
                hasLoading, setLoading,
                mainCategory, setMainCategory,
                allEvents, setAllEvents,
                mostReadArticle, setReadMostArticle,
                banner, setBanner
            }}
        >
            {children}
        </EventsContext.Provider>
    )
}

export const useEventsContext = (): EventsContextData => {
    const context = useContext(EventsContext);
    if(!context){
        throw new Error("EventsContext must be used within an EventsProvider");
    }

    return context;
}
