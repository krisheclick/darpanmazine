'use client';
import MobileAd from "../common/advertiesment/poster-ad/MobileAd";
import MusicAd from "../common/advertiesment/poster-ad/MusicAd";
import PopularPost from "../post/popular/Post";
import TrendingPostAd from "../common/advertiesment/poster-ad/TrendingPostAd";
import BlogAd from "../common/advertiesment/poster-ad/BlogAd";
import PosterAd from "../common/advertiesment/poster-ad/PosterAd";

import Styles from "./style.module.css";
import Calendar, { TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import 'react-loading-skeleton/dist/skeleton.css'
import { useEventsContext } from "@/context/events_context";

interface CalendarApiResponse {
    response_code: boolean;
    response_message: string;
    response_data: {
        date: string[];
    };
}

type PageProps = {
    checkCategory?: boolean;
    slug: string[];
};

const Sidebar = ({ checkCategory = false, slug }: PageProps) => {

    const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
    const [eventDates, setEventDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const {setLoading: setContextLoading, setAllEvents} = useEventsContext();
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const month = activeStartDate.getMonth() + 1; // 1-12
                const year = activeStartDate.getFullYear();
                let API = `${process.env.NEXT_PUBLIC_API_URL}/event/calender-list?month=${month}&year=${year}`;
                if(checkCategory) {
                    API = `${process.env.NEXT_PUBLIC_API_URL}/event/${slug.at(-1)}/calender-list?month=${month}&year=${year}`;
                }

                const response = await fetch(API);

                const data: CalendarApiResponse = await response.json();
                if (!response.ok) {
                    throw new Error(data.response_message || "Failed to fetch events");
                }
                setEventDates(data.response_data.date);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [activeStartDate]);

    const getTileClassName = ({ date, view }: TileArgs): string | undefined => {
        if (view === "month") {
            const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
            if (eventDates.includes(formattedDate)) {
                return "event-highlight";
            }
        }
        return undefined;
    };

    const handleDateClick = (date: Date) => {
        const formattedDate = date.toLocaleDateString("en-CA");
        
        router.push(`?date=${formattedDate}`);
        if (eventDates.includes(formattedDate)) {
            setContextLoading(true);
        } else {
            setAllEvents([]);
        }
    };

    return (
        <div className={Styles.sidebar}>
            <MobileAd />
            <MusicAd />
            <Calendar
                onActiveStartDateChange={({ activeStartDate }) =>
                    setActiveStartDate(activeStartDate as Date)
                }
                onClickDay={handleDateClick}
                tileClassName={getTileClassName}
                showFixedNumberOfWeeks
            />
            <PopularPost />
            <TrendingPostAd />
            <PosterAd />
            <BlogAd />
        </div>
    )
}

export default Sidebar
