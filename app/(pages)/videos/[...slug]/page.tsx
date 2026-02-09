import VideosData from "@/components/photos/Photos";

export const dynamicParams = true;
const PhotosPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return (
        <VideosData slug={[...slug]} />
    )
}

export default PhotosPage