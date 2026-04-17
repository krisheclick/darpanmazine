"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type Banner = {
  heading: string;
  publishDate: string;
  thumb_image: string;
  permalink: string;
  tag: string;
}

export type Nominees= {
  award_id: number;
  previous_year: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  occupation: string;
  category: string;
  other_category: string;
  award_reason: string;
  person_name: string;
  person_association: string;
  person_address: string;
  person_phone: string;
  person_email: string;
  profile_pic: string;
  bio: string;
  person_website: string;
}

export type AwardsContent = {
  author: string;
  award_year: string;
  heading: string;
  permalink: string;
  short_description: string;
  thumb_image: string;
  publish_date: string;
  nominees: Nominees;
}

export type mostReadArticles = {
    heading: string;
    permalink: string;
    thumb_image: string;
}
export type mostArticles = {
  heading: string;
  permalink: string;
  thumb_image: string;
  short_description: string;
  publish_date: string;
}
export type latestAwards = {
    heading: string;
    permalink: string;
    thumb_image: string;
}
export type prevPost = {
  heading: string;
  permalink: string;
}
export type nextPost = {
  heading: string;
  permalink: string;
}

type AwardData = {
    awardsData: AwardsContent[] | null;
    setAwards: (awardsData: AwardsContent[]) => void;
    category: string | null;
    setCategory: (category: string) => void;
    mostReadArticles: mostReadArticles[] | null;
    setMostReadArticles: (mostReadArticles: mostReadArticles[]) => void;
    mostArticles: mostArticles[] | null;
    setMostArticles: (mostArticles: mostArticles[]) => void;
    latestAwards: latestAwards[] | null;
    setLatestAwards: (latestAwards: latestAwards[]) => void;
    hasLoading: boolean;
    setLoading: (hasLoading: boolean) => void;
    banner: Banner[] | null;
    setBanner: (banner: Banner[]) => void;
}

const awardContext = createContext<AwardData | undefined>(undefined);
export const AwardProvider = ({children} : {children: ReactNode}) => {
    const [awardsData, setAwards] = useState<AwardsContent[] | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    const [mostReadArticles, setMostReadArticles] = useState<mostReadArticles[] | null>(null);
    const [mostArticles, setMostArticles] = useState<mostArticles[] | null>(null);
    const [latestAwards, setLatestAwards] = useState<latestAwards[] | null>(null);
    const [banner, setBanner] = useState<Banner[] | null>(null);
    const [hasLoading, setLoading] = useState(true);
    return(
        <awardContext.Provider value={{awardsData, setAwards, category, setCategory, hasLoading, setLoading, mostReadArticles, setMostReadArticles, mostArticles, setMostArticles, latestAwards, setLatestAwards, banner, setBanner}}>
            {children}
        </awardContext.Provider>
    )
}

export const useAwardContext = () : AwardData => {
    const useAwardContent = useContext(awardContext);
    if(!useAwardContent){
        throw new Error("Awardprovider must be use on layout.tsx children wrapper");
    }
    return useAwardContent;
}