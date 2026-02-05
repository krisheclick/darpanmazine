import Sidebar from "@/components/sidebar/Sidebar";
import ReadMoreSlider from "@/components/readmore/ReadMore";
import { Container } from "react-bootstrap";
import { PostProvider } from "@/context/post_context";

const PostLayout = async({children}: Readonly<{children: React.ReactNode}>) => {
    return(
        <PostProvider>
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            {children}
                        </article>
                        <aside className="sidebar_column">
                            <Sidebar />
                        </aside>
                    </div>
                </Container>
            </div>
            <ReadMoreSlider />
        </PostProvider>
    )
}

export default PostLayout;