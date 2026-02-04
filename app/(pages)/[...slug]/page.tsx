import PostPageComponent from "@/components/post/Postpage";

export const dynamicParams = true;

const PostPage = async({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;

    let isCategory = true;
    if(slug.length > 1){
        const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check/iscategory/${[...slug].join('/')}/`, 
        {cache: "no-store"}
    );
        const {response_data} = await resposne.json();
        isCategory = response_data?.category ?? false;
    }else {
        isCategory = true;
    }
    return (
        <PostPageComponent
            checkCategory={isCategory}
            slug={[...slug]}
        />
    )
}
export default PostPage;