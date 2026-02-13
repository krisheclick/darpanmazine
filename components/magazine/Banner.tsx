"use client";
import { usePostContext } from "@/context/post_context";
import Sliderbanner from "@/components/common/banner/Sliderbanner";

const MagazineBanner = () => {
    const {hasLoading, banner} = usePostContext();
    const bannerData = banner?.map((bannerItem) => ({
        poster: `${process.env.NEXT_PUBLIC_MEDIA_URL}${bannerItem?.thumbnail?.file_url}`,
        link: `${process.env.NEXT_PUBLIC_ENV_URL}/${bannerItem?.categoryview?.slug}${bannerItem?.permalink}`,
        title: bannerItem?.heading,
        publishDate: bannerItem?.publishDate,
    })) || [];
    return <Sliderbanner hasLoading={hasLoading} bannerData={bannerData} />
}

export default MagazineBanner;