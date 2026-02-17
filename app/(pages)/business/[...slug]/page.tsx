import BusinessDetails from "@/components/business/BusinessDetails";
import BusinessIndex from "@/components/business/BusinessIndex";

const BusinessInnerPage = async({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const [currentUrl, ...slugArray] = [...slug].reverse();
    let isCategory = null;
    if(slug.length){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/check/iscategory/${currentUrl}`);
        const {response_data} = await response.json();
        isCategory = response_data?.category;
    }else {
        isCategory = false;
    }

    return isCategory ? <BusinessIndex slug={[...slug]} categoryCheck={isCategory} /> : <BusinessDetails slug={[...slug]} />
}

export default BusinessInnerPage;