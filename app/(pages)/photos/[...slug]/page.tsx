import DetailsPage from "@/components/photos/details/page";
import PhotosData from "@/components/photos/Photos";

export const dynamicParams = true;
const PhotosPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let isCategory;
    if(slug.length > 0){
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/photos/check/iscategory/${[...slug].join('/')}/`,
            {cache: "no-cache"}
        );
        const {response_data} = await response.json();
        isCategory = response_data?.category;
    }else {
        isCategory= true;
    }
    return (
        isCategory ? <PhotosData slug={[...slug]} categoryCheck={isCategory} /> : <DetailsPage slug={[...slug]} />        
    )
}

export default PhotosPage