import PostPageComponent from "@/components/post/Postpage";
import ReadMoreSlider from "@/components/readmore/ReadMore";
import Sidebar from "@/components/sidebar/Sidebar";
import { Container } from "react-bootstrap";

export const dynamicParams = true;

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    let isCategory = true;
    if (slug.length > 1) {
        const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check/iscategory/${[...slug].join('/')}/`,
            { cache: "no-store" }
        );
        const { response_data } = await resposne.json();
        isCategory = response_data?.category ?? false;
    } else {
        isCategory = true;
    }
    return (
        <>
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            <PostPageComponent
                                checkCategory={isCategory}
                                slug={[...slug]}
                            />
                        </article>
                        <aside className="sidebar_column">
                            <Sidebar />
                        </aside>
                    </div>
                </Container>
            </div>
            <ReadMoreSlider />
        </>

    )
}
export default PostPage;