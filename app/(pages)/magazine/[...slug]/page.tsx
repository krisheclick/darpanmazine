import MagazineList from "@/components/magazine/List";
import MagazineDetails from "@/components/magazine/MagazineDetails";

export const dynamicParams = true;

const page = async({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const full_url = [...slug].join('/');
    
    let isCatgoryCheck = null;
    if(slug.length > 0){
        const catResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/magazines/check/iscategory/${full_url}/`,
            {cache: "no-store"}
        );
        const {response_data} = await catResponse.json();
        isCatgoryCheck = response_data?.category ?? false ;
    }else {
        isCatgoryCheck = false;
    }

    return (
        isCatgoryCheck ? 
        <MagazineList 
            catgoryCheck={isCatgoryCheck}
            slug={[...slug]}
        /> 
        : <MagazineDetails slug={[...slug]} />)
}

export default page
