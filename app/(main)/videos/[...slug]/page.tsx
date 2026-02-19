import DetailsPage from "@/components/videos/details/page";
import VideoList from "@/components/videos/List";

export const dynamicParams = true;
const PhotosPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let isCategory = null;
    if(slug.length > 0){
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/videos/check/iscategory/${[...slug].join('/')}/`,
            {cache: "no-store"}
        );
        const {response_data} = await response.json();
        isCategory = response_data?.category;
    }else {
        isCategory = false;
    }
    return isCategory ?  <VideoList slug={[...slug]} categoryCheck={isCategory} /> : <DetailsPage slug={[...slug]} />
    // return <VideoList slug={[...slug]} categoryCheck={isCategory} />
}

export default PhotosPage